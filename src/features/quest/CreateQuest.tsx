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
import { PriorityLevel } from "../../shared/types/priority.types";
import { CreateStep } from "../../shared/types/step.types";

type CreateQuestProps = {
	onClose: () => void;
};

const createQuestSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be more than 3 characters")
		.max(50, "Name cannot exceed 50 characters"),
	description: z
		.string()
		.min(5, "Description must be more than 5 characters")
		.max(120, "Description cannot exceed 120 characters"),
	dueDate: z.date({ required_error: "Due date is required" }).refine(
		(date) => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const selectedDate = new Date(date);
			selectedDate.setHours(0, 0, 0, 0);
			return selectedDate >= today;
		},
		{
			message: "Due date cannot be in the past",
		},
	),
	priority: z.nativeEnum(PriorityLevel).default(PriorityLevel.LOW),
	members: z
		.array(z.string())
		.min(1, "At least one member must be assigned to the quest"),
	steps: z.array(z.string().min(1, "Step cannot be empty")).max(10).optional(),
});

type CreateQuestData = z.infer<typeof createQuestSchema>;

function CreateQuest({ onClose }: CreateQuestProps) {
	const { partyId } = useParams();
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
			steps: [],
		},
	});

	const handleAddStep = () => {
		if (form.values.steps) {
			if (form.values.steps.length < 10) {
				form.insertListItem("steps", "");
			}
		}
	};

	const handleRemoveStep = (index: number) => {
		form.removeListItem("steps", index);
	};

	async function onSubmit(data: CreateQuestData) {
		try {
			const newQuest = {
				partyId: Number(partyId),
				title: data.name,
				priority: data.priority,
				description: data.description,
				dueDate: data.dueDate,
				memberIds: data.members.map(Number),
				steps: (data.steps || []).map((step) => ({
					description: step,
				})) as CreateStep[],
			};

			console.log("Create quest: ", newQuest);

			await createQuest(partyId!, newQuest);
			onClose();
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
		getMembers(Number(partyId), { pageSize: 99999999 });
	}, [partyId]);

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
					<Text size="sm">Steps</Text>
					{form.values.steps && form.values.steps.length === 0 ? (
						<Text>You can optionally add up to 10 steps</Text>
					) : (
						(form.values.steps || []).map((_, index) => (
							<Flex
								key={index}
								w="100%"
								gap={8}
							>
								<TextInput
									placeholder="Step description"
									{...form.getInputProps(`steps.${index}`)}
									classNames={{ input: classes.input }}
									w="100%"
								/>
								<ActionIcon
									color="red"
									variant="light"
									onClick={() => handleRemoveStep(index)}
									h={37}
									w={37}
								>
									<Trash2 size={16} />
								</ActionIcon>
							</Flex>
						))
					)}
					{form.values.steps && form.values.steps.length >= 10 ? null : (
						<Group justify="flex-start">
							<Button
								color="violet"
								variant="light"
								onClick={handleAddStep}
							>
								Add Step
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
