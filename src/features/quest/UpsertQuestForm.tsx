import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
	ActionIcon,
	Button,
	Flex,
	Group,
	MultiSelect,
	Select,
	Stack,
	Textarea,
	TextInput,
	Text,
} from "@mantine/core";
import classes from "../auth/auth.module.css";
import { DateInput } from "@mantine/dates";
import { useEffect } from "react";
import { CreateStep, Quest, Step } from "../../shared/types/quest.types";
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
		.array(z.string())
		.min(1, "At least one member must be assigned to the quest"),
	steps: z.array(z.string().min(1, "Task cannot be empty")).max(10).optional(),
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

	const form = useForm<QuestData>({
		validate: zodResolver(questSchema),
		initialValues: {
			title: "",
			description: "",
			dueDate: new Date(),
			priority: PriorityLevel.LOW,
			members: [],
			steps: [],
		},
	});

	const handleAddTask = () => {
		if (form.values.steps) {
			if (form.values.steps.length < 10) {
				form.insertListItem("steps", "");
			}
		}
	};

	const handleRemoveTask = (index: number) => {
		form.removeListItem("steps", index);
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
				steps: (data.steps || []).map((task) => ({
					description: task,
				})) as CreateStep[],
			};

			const createdQuest = await createQuest(campaignId, newQuest);
			return createdQuest;
		}
	};

	const updateExistingQuest = async (data: QuestData) => {
		if (campaignId && questId) {
			const updatedCampaign = {
				id: Number(questId),
				campaignId: Number(campaignId),
				title: data.title,
				priority: data.priority,
				description: data.description,
				dueDate: data.dueDate,
				memberIds: data.members.map(Number),
				steps: (data.steps || []).map((task) => ({
					description: task,
				})) as Step[],
			};
			await updateQuest(campaignId, questId, updatedCampaign);
		}
	};

	async function onSubmit(data: QuestData) {
		try {
			if (quest) {
				updateExistingQuest(data);
			} else {
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
	console.log(quest);
	useEffect(() => {
		if (quest) {
			form.setValues({
				title: quest.title,
				description: quest.description,
				dueDate: new Date(quest.dueDate),
				priority: quest.priority || PriorityLevel.LOW, // Ensure you set the priority
				members: quest.members.map((member) => member.id.toString()), // Set existing member IDs as strings
				steps: quest.steps.map((step) => step.description), // Assuming each step has a description field
			});
		}
	}, [quest, questId]);

	useEffect(() => {
		getMembers(Number(campaignId), { pageSize: 99999999 });
	}, [campaignId]);

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={8}>
				<TextInput
					label="Title"
					placeholder="Name of your Campaign?"
					classNames={{
						input: classes.input,
					}}
					{...form.getInputProps("title")}
				/>
				<Textarea
					label="Description"
					placeholder="Describe your campaign"
					autosize
					{...form.getInputProps("description")}
				/>
				<DateInput
					label="Due Date"
					placeholder="Due Date"
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
									placeholder="Task description"
									{...form.getInputProps(`steps.${index}`)}
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
					{form.values.steps && form.values.steps.length >= 10 ? null : (
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
