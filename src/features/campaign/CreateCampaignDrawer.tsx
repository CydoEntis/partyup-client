import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import {
	Button,
	ColorSwatch,
	Flex,
	Stack,
	Textarea,
	TextInput,
	Text,
} from "@mantine/core";
import classes from "../auth/auth.module.css";
import { DateInput } from "@mantine/dates";
import useMemberStore from "../../stores/useMemberStore";
import { useEffect, useState } from "react";
import useCampaignStore from "../../stores/useCampaignStore";
import { Color } from "../../shared/types/color.types";
import { Check } from "lucide-react";

const createCampaignSchema = z.object({
	title: z
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

type CreateCampaignData = z.infer<typeof createCampaignSchema>;

type CreateCampaignDrawerProps = {
	isEditing: boolean;
};

function CreateCampaignDrawer({ isEditing }: CreateCampaignDrawerProps) {
	const { campaignId } = useParams();
	const { createCampaign } = useCampaignStore();
	const { getMembers, members } = useMemberStore();
	const [selectedColor, setSelectedColor] = useState("blue");
	const colors = [
		{ name: "red", value: "#E03131" },
		{ name: "pink", value: "#C2255C" },
		{ name: "grape", value: "#9C36B5" },
		{ name: "violet", value: "#6741D9" },
		{ name: "indigo", value: "#3B5BDB" },
		{ name: "blue", value: "#1971C2" },
		{ name: "cyan", value: "#0C8599" },
		{ name: "teal", value: "#099268" },
		{ name: "green", value: "#2F9E44" },
		{ name: "lime", value: "#66A80F" },
		{ name: "yellow", value: "#F08C00" },
		{ name: "orange", value: "#E8590C" },
	];

	const form = useForm<CreateCampaignData>({
		validate: zodResolver(createCampaignSchema),
		initialValues: {
			title: "",
			description: "",
			dueDate: new Date(),
		},
	});

	async function onSubmit(data: CreateCampaignData) {
		try {
			const newCampaign = {
				campaignId: Number(campaignId),
				title: data.title,
				description: data.description,
				dueDate: data.dueDate,
				color: selectedColor as Color,
			};

			await createCampaign(newCampaign);
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
				<Text size="sm">Select a Color</Text>
				<Flex
					py={8}
					gap={8}
					align="center"
				>
					{colors.map((color) => (
						<ColorSwatch
							key={color.name}
							color={color.value}
							onClick={() => setSelectedColor(color.name)}
							style={{ color: "#fff", cursor: "pointer" }}
						>
							{selectedColor === color.name ? <Check size={20} /> : null}
						</ColorSwatch>
					))}
				</Flex>
			</Stack>
			<Button
				fullWidth
				mt="xl"
				color="violet"
				variant="light"
				type="submit"
			>
				{isEditing ? "Update Campaign" : "Create Campaign"}
			</Button>
		</form>
	);
}

export default CreateCampaignDrawer;
