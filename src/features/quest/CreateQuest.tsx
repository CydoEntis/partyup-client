import { z } from "zod";
import useQuestStore from "../../stores/useQuestStore";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import {
	Button,
	MultiSelect,
	Select,
	Textarea,
	TextInput,
} from "@mantine/core";
import classes from "../auth/auth.module.css";
import { Task } from "../../shared/types/quest.types";
import { DateInput } from "@mantine/dates";
import useMemberStore from "../../stores/useMemberStore";
import { useEffect } from "react";

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
		.min(1, "At least one member must be assigned to the quest"), // New validation for members
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
			members: [], // Initialize members as an empty array
		},
	});

	async function onSubmit(data: CreateQuestData) {
		try {
			const newQuest = {
				name: data.name,
				description: data.description,
				dueDate: data.dueDate,
				memberIds: data.members.map(Number), // Convert member IDs to numbers
				tasks: [] as Task[],
			};
			await createQuest(Number(campaignId), newQuest); // Ensure to call createQuest with newQuest
			console.log("Create quest: ", newQuest);
			form.reset();
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError && error.response?.data?.errors) {
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
				{...form.getInputProps("members")} // Connect MultiSelect to the members input
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
