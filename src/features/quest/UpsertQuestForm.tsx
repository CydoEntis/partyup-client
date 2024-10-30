import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
	ActionIcon,
	Button,
	Flex,
	MultiSelect,
	Select,
	Stack,
	Textarea,
	TextInput,
	Text,
	Group,
} from "@mantine/core";
import classes from "../auth/auth.module.css";
import { DateInput } from "@mantine/dates";
import { useEffect } from "react";
import { CreateTask, Quest } from "../../shared/types/quest.types";
import useQuestStore from "../../stores/useQuestStore";
import { PriorityLevel } from "../../shared/types/prioty.types";
import { Trash2 } from "lucide-react";
import useMemberStore from "../../stores/useMemberStore";

const questSchema = z.object({
	title: z
		.string()
		.min(3, "Title must be more than 3 characters")
		.max(50, "Title cannot exceed 50 characters"),
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
		.array(
			z.object({
				id: z.number(),
				displayName: z.string(),
				avatar: z.number(),
			}),
		)
		.min(1, "At least one member must be assigned to the quest"),
	tasks: z
		.array(
			z.object({
				description: z.string().min(1, "Task cannot be empty"),
			}),
		)
		.max(10)
		.optional(),
});

type QuestData = z.infer<typeof questSchema>;

type UpsertQuestProps = {
	quest?: Quest;
	onClose: () => void;
};

function UpsertQuestForm({ quest, onClose }: UpsertQuestProps) {
	const { campaignId, questId } = useParams();
	const { createQuest, updateQuest } = useQuestStore();
	const { getMembers, members } = useMemberStore();
	const navigate = useNavigate();

	useEffect(() => {
		getMembers(Number(campaignId), { pageSize: 99999999 });
	}, [campaignId]);

	const form = useForm<QuestData>({
		validate: zodResolver(questSchema),
		initialValues: {
			title: quest?.title || "",
			description: quest?.description || "",
			dueDate: quest?.dueDate ? new Date(quest.dueDate) : new Date(),
			priority: quest?.priority || PriorityLevel.LOW,
			members: quest?.members || [],
			tasks: quest?.tasks || [],
		},
	});

	const handleAddTask = () => {
		if (form.values.tasks && form.values.tasks.length < 10) {
			form.insertListItem("tasks", { description: "" });
		}
	};

	const handleRemoveTask = (index: number) => {
		form.removeListItem("tasks", index);
	};

	const createNewQuest = async (data: QuestData) => {
		if (campaignId) {
			const newQuest = {
				campaignId: Number(campaignId),
				title: data.title,
				priority: data.priority,
				description: data.description,
				dueDate: data.dueDate,
				memberIds: data.members.map(Number),
				tasks: (data.tasks || []).map((task) => ({
					description: task.description,
				})) as CreateTask[],
			};

			const createdQuest = await createQuest(campaignId, newQuest);
			return createdQuest;
		}
	};

	const updateExistingQuest = async (data: QuestData) => {
		if (campaignId && questId) {
			const updatedQuest = {
				id: Number(questId),
				campaignId: Number(campaignId),
				title: data.title,
				priority: data.priority,
				description: data.description,
				dueDate: data.dueDate,
				memberIds: data.members.map(Number),
				tasks: (data.tasks || []).map((task) => ({
					description: task.description,
				})) as CreateTask[],
			};
			await updateQuest(campaignId, questId, updatedQuest);
		}
	};

	async function onSubmit(data: QuestData) {
		try {
			if (quest) {
				updateExistingQuest(data);
			} else {
				console.log("Creating new campaign");
				const newCampaign = await createNewQuest(data);
				navigate(`/campaigns/${newCampaign!.id}/quests`);
			}

			form.reset();
			onClose();
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.errors) {
				console.error(error.response?.data?.errors);
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
	console.log(form.errors);

	useEffect(() => {
		if (quest) {
			form.setValues({
				title: quest.title,
				description: quest.description,
				dueDate: new Date(quest.dueDate),
				priority: quest.priority,
				members: quest.members,
				tasks: quest.tasks,
			});
		}
	}, [quest, questId]);

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={8}>
				<TextInput
					label="Title"
					placeholder="What should this quest be called?"
					classNames={{
						input: classes.input,
					}}
					{...form.getInputProps("title")}
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
									{...form.getInputProps(`tasks.${index}.description`)}
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
				{quest ? "Update Quest" : "Create Quest"}
			</Button>
		</form>
	);
}

export default UpsertQuestForm;
