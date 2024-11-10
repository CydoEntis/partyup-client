import { z } from "zod";
import { User } from "../../shared/types/auth.types";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { Stack, TextInput } from "@mantine/core";
import classes from "../../features/auth/auth.module.css";
import useAuthStore from "../../stores/useAuthStore";

type UpdateDisplayNameFormProps = { user: User, onClose: () => void; };

const updateDisplayNameSchema = z.object({
	displayName: z
		.string()
		.min(3, "Name must be more than 3 characters")
		.max(50, "Name cannot exceed 50 characters"),
});

type UpdateDisplayName = z.infer<typeof updateDisplayNameSchema>;

function UpdateDisplayNameForm({ user, onClose }: UpdateDisplayNameFormProps) {
	const { updateUserDisplayName } = useAuthStore();

	const form = useForm<UpdateDisplayName>({
		validate: zodResolver(updateDisplayNameSchema),
		initialValues: {
			displayName: user?.displayName || "",
		},
	});

	const updateUpdateDisplayName = async (data: UpdateDisplayName) => {
		await updateUserDisplayName(data.displayName);
	};

	async function onSubmit(data: UpdateDisplayName) {
		try {
			console.log("Submitting");
			if (user) {
				updateUpdateDisplayName(data);

				console.log(form.errors);
			}

			onClose();
			form.reset();
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
		if (user) {
			form.setValues({
				displayName: user.displayName,
			});
		}
	}, [user]);

	return (
		<form
			id="updateDisplayNameForm"
			onSubmit={form.onSubmit(onSubmit)}
		>
			<Stack gap={12}>
				<TextInput
					label="Display Name"
					placeholder="New Display Name"
					classNames={{
						input: classes.input,
					}}
					{...form.getInputProps("displayName")}
					w={300}
				/>
			</Stack>
		</form>
	);
}

export default UpdateDisplayNameForm;
