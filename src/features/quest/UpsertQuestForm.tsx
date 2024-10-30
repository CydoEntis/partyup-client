import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import classes from "../auth/auth.module.css";
import { DateInput } from "@mantine/dates";
import { useEffect } from "react";
import { CreateTask, Quest } from "../../shared/types/quest.types";
import useQuestStore from "../../stores/useQuestStore";
import { PriorityLevel } from "../../shared/types/prioty.types";

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
	tasks: z.array(z.string().min(1, "Task cannot be empty")).max(10).optional(),
});

type QuestData = z.infer<typeof questSchema>;

type UpsertQuestProps = {
	quest?: Quest;
	onClose: () => void;
};

function UpsertQuestForm({ quest, onClose }: UpsertQuestProps) {
	const { campaignId, questId } = useParams();
	const { createQuest, updateQuest } = useQuestStore();
	const navigate = useNavigate();

	const form = useForm<QuestData>({
		validate: zodResolver(questSchema),
		initialValues: {
			title: "",
			description: "",
			dueDate: new Date(),
			priority: PriorityLevel.LOW,
			members: [],
			tasks: [],
		},
	});

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
					description: task,
				})) as CreateTask[],
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
				tasks: (data.tasks || []).map((task) => ({
					description: task,
				})) as CreateTask[],
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

	useEffect(() => {
		if (quest) {
			form.setValues({
				title: quest.title,
				description: quest.description,
				dueDate: new Date(quest.dueDate),
			});
		}
	}, [quest, questId]);

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
