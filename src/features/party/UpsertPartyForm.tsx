import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { Color } from "../../shared/types/color.types";
import { Check } from "lucide-react";
import { Party } from "../../shared/types/party.types";
import usePartyStore from "../../stores/usePartyStore";

const createPartySchema = z.object({
	title: z
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
});

type PartyData = z.infer<typeof createPartySchema>;

type UpsertPartyProps = {
	party?: Party;
	onClose: () => void;
};

function UpsertPartyForm({ party, onClose }: UpsertPartyProps) {
	const { partyId } = useParams();
	const { createParty, updateParty } = usePartyStore();
	const navigate = useNavigate();
	const [selectedColor, setSelectedColor] = useState(party?.color || "red");
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

	const form = useForm<PartyData>({
		validate: zodResolver(createPartySchema),
		initialValues: {
			title: party?.title || "",
			description: party?.description || "",
			dueDate: party?.dueDate ? new Date(party.dueDate) : new Date(),
		},
	});

	const createNewParty = async (data: PartyData) => {
		const newParty = {
			partyId: Number(partyId),
			title: data.title,
			description: data.description,
			dueDate: data.dueDate,
			color: selectedColor as Color,
		};

		const createdParty = await createParty(newParty);
		return createdParty;
	};

	const updateExistingParty = async (data: PartyData) => {
		const updatedParty = {
			id: Number(partyId),
			title: data.title,
			description: data.description,
			dueDate: data.dueDate,
			color: selectedColor as Color,
		};
		if (partyId) {
			await updateParty(partyId, updatedParty);
		}
	};

	async function onSubmit(data: PartyData) {
		try {
			if (party) {
				updateExistingParty(data);
			} else {
				const newParty = await createNewParty(data);
				navigate(`/partys/${newParty.id}/quests`);
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
		if (party) {
			form.setValues({
				title: party.title,
				description: party.description,
				dueDate: new Date(party.dueDate),
			});
			setSelectedColor(party.color);
		}
	}, [party, partyId]);

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={8}>
				<TextInput
					label="Title"
					placeholder="Name of your Party?"
					classNames={{
						input: classes.input,
					}}
					{...form.getInputProps("title")}
				/>
				<Textarea
					label="Description"
					placeholder="Describe your party"
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
							onClick={() => setSelectedColor(color.name as Color)}
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
				{party ? "Update Party" : "Create Party"}
			</Button>
		</form>
	);
}

export default UpsertPartyForm;
