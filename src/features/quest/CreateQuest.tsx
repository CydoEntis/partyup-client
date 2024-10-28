import { z } from "zod";
import useQuestStore from "../../stores/useQuestStore";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import {
	ActionIcon,
	Button,
	Group,
	MultiSelect,
	Select,
	Stack,
	Textarea,
	TextInput,
	Text,
	Flex,
} from "@mantine/core";
import classes from "../auth/auth.module.css";
import { DateInput } from "@mantine/dates";
import useMemberStore from "../../stores/useMemberStore";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { CreateTask } from "../../shared/types/quest.types";

type Props = {};

export enum PriorityLevel {
	CRITICAL = "Critical",
	HIGH = "High",
	MEDIUM = "Medium",
	LOW = "Low",
}

const createQuestSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be more than 3 characters")
		.max(50, "Name cannot exceed 50 characters"),
	description: z
		.string()
		.min(5, "Description must be more than 5 characters")
		.max(120, "Description cannot exceed 120 characters"),
	dueDate: z
		.date({ required_error: "Due date is required" })
		.refine((date) => date >= new Date(), {
			message: "Due date cannot be in the past",
		}),
	priority: z.nativeEnum(PriorityLevel).default(PriorityLevel.LOW),
	members: z
		.array(z.string())
		.min(1, "At least one member must be assigned to the quest"),
	tasks: z.array(z.string().min(1, "Task cannot be empty")).max(10).optional(),
});

type CreateQuestData = z.infer<typeof createQuestSchema>;

function CreateQuest({}: Props) {
	const { campaignId } = useParams();
	const { createQuest } = useQuestStore();
	const { getMembers, members } = useMemberStore();

	const form = useForm<CreateQuestData>({
		validate: zodResolver(createQuestSchema),
		initialValues: {
			name: "",
			description: "",
			dueDate: new Date(),
			priority: PriorityLevel.LOW,
			members: [],
			tasks: [],
		},
	});

	const handleAddTask = () => {
		if (form.values.tasks) {
			if (form.values.tasks.length < 10) {
				form.insertListItem("tasks", "");
			}
		}
	};

	const handleRemoveTask = (index: number) => {
		form.removeListItem("tasks", index);
	};

	async function onSubmit(data: CreateQuestData) {
		try {
			const newQuest = {
				campaignId: Number(campaignId),
				name: data.name,
				priority: data.priority,
				description: data.description,
				dueDate: data.dueDate,
				memberIds: data.members.map(Number),
				tasks: (data.tasks || []).map((task) => ({
					description: task, 
				})) as CreateTask[],
			};

			console.log("Create quest: ", newQuest);


			await createQuest(Number(campaignId), newQuest);
			form.reset();
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.errors) {
				console.error(error.response.data.errors);
				const errors = error.response.data.errors as Record<string, string[]>;
				const fieldErrors: Record<string, string> = {};

				for (const [key, messages] of Object.entries(errors)) {
					if (Array.isArray(messages) && messages.length > 0) {
						fieldErrors[key] = messages[0];
					}
				}

				form.setErrors(fieldErrors);
			}
		}
	}

	useEffect(() => {
		getMembers(Number(campaignId), { pageSize: 99999999 });
	}, [campaignId]);

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={8}>
				<TextInput
					label="Title"
					placeholder="What should this quest be called?"
					classNames={{
						input: classes.input,
					}}
					{...form.getInputProps("name")}
				/>
				<Textarea
					label="Description"
					placeholder="Your quest description"
					autosize
					{...form.getInputProps("description")}
				/>

				<DateInput
					label="Pick date"
					placeholder="Pick date"
					{...form.getInputProps("dueDate")}
					color="violet"
				/>
				<MultiSelect
					label="Member List"
					placeholder="Assign a Member"
					data={members?.items.map((member) => ({
						value: member.id.toString(),
						label: member.displayName,
					}))}
					searchable
					{...form.getInputProps("members")}
				/>
				<Select
					label="Priority Level"
					placeholder="Assign a Priority Level"
					data={[
						PriorityLevel.CRITICAL,
						PriorityLevel.HIGH,
						PriorityLevel.MEDIUM,
						PriorityLevel.LOW,
					]}
					defaultValue={PriorityLevel.LOW}
					{...form.getInputProps("priority")}
				/>

				<Stack
					gap={8}
					py={8}
				>
					<Text size="sm">Tasks</Text>
					{form.values.tasks && form.values.tasks.length === 0 ? (
						<Text>You can optionally add up to 10 tasks</Text>
					) : (
						(form.values.tasks || []).map((_, index) => (
							<Flex
								key={index}
								w="100%"
								gap={8}
							>
								<TextInput
									placeholder="Task description"
									{...form.getInputProps(`tasks.${index}`)}
									classNames={{ input: classes.input }}
									w="100%"
								/>
								<ActionIcon
									color="red"
									variant="light"
									onClick={() => handleRemoveTask(index)}
									h={37}
									w={37}
								>
									<Trash2 size={16} />
								</ActionIcon>
							</Flex>
						))
					)}
					{form.values.tasks && form.values.tasks.length >= 10 ? null : (
						<Group justify="flex-start">
							<Button
								color="violet"
								variant="light"
								onClick={handleAddTask}
							>
								Add Task
							</Button>
						</Group>
					)}
				</Stack>
			</Stack>
			<Button
				fullWidth
				mt="xl"
				color="violet"
				variant="light"
				type="submit"
			>
				Create Quest
			</Button>
		</form>
	);
}

export default CreateQuest;
