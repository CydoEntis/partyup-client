import { z } from "zod";
import useQuestStore from "../../stores/useQuestStore";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { Button, Textarea, TextInput } from "@mantine/core";
import classes from "../auth/auth.module.css";
import { Task } from "../../shared/types/quest.types";
import { DateInput, DatePickerInput } from "@mantine/dates";
import useMemberStore from "../../stores/useMemberStore";
import { useEffect } from "react";

type Props = {};

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
		},
	});

	async function onSubmit(data: CreateQuestData) {
		try {
			const newQuest = {
				name: "",
				description: "",
				dueDate: new Date(),
				memberIds: [] as Number[],
				tasks: [] as Task[],
			};
			// await createQuest(Number(campaignId), newQuest);
			console.log("Create quest: ", data);
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
		getMembers(Number(campaignId));
	}, [campaignId]);

	console.log("Members: ", members);

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
				{...form.getInputProps("description")}
			/>
			<DateInput
				label="Pick date"
				placeholder="Pick date"
				{...form.getInputProps("dueDate")}
				color="violet"
				getDayProps={(date: Date) => {
					const isSelected =
						form.values.dueDate?.toDateString() === date.toDateString();

					return {
						style: {
							backgroundColor: isSelected ? "#5F3DC4" : undefined,
						},
					};
				}}
			/>
			<Button
				fullWidth
				mt="xl"
				color="violet"
				variant="light"
				type="submit"
			>
				Sign in
			</Button>
		</form>
	);
}

export default CreateQuest;
