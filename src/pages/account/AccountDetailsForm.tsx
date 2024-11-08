import { z } from "zod";
import { User } from "../../shared/types/auth.types";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { TextInput } from "@mantine/core";
import classes from "../../features/auth/auth.module.css";

type AccountDetailsFormProps = { user: User };

const accountDetailsSchema = z.object({
	displayName: z
		.string()
		.min(3, "Name must be more than 3 characters")
		.max(50, "Name cannot exceed 50 characters"),
	email: z.string().email("Please enter a valid email"),
});

type AccountDetails = z.infer<typeof accountDetailsSchema>;

function AccountDetailsForm({ user }: AccountDetailsFormProps) {
	const form = useForm<AccountDetails>({
		validate: zodResolver(accountDetailsSchema),
		initialValues: {
			displayName: user?.displayName || "",
			email: user?.email || "",
		},
	});

	const updateAccountDetails = async (data: AccountDetails) => {
		const updatedAccountDetails = {
			id: user.id,
			displayName: data.displayName,
		};
		// await updateUserDisplayName(updatedAccountDetails);
	};

	async function onSubmit(data: AccountDetails) {
		try {
			if (user) {
				updateAccountDetails(data);
			}

			form.reset();
			// onClose();
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
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				label="Display Name"
				placeholder="New Display Name"
				classNames={{
					input: classes.input,
				}}
				{...form.getInputProps("displayName")}
			/>
			<TextInput
				label="Email"
				placeholder="New Email"
				classNames={{
					input: classes.input,
				}}
				disabled
				{...form.getInputProps("email")}
			/>
		</form>
	);
}

export default AccountDetailsForm;
