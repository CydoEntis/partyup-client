import {
	Anchor,
	Button,
	Checkbox,
	Group,
	Paper,
	PasswordInput,
	Stack,
	TextInput,
} from "@mantine/core";
import { AtSign, Lock, User, User2 } from "lucide-react";
import { NavLink } from "react-router-dom";

import classes from "./auth.module.css";

import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import ValidatedPasswordInput from "../../components/input/ValidatedPasswordInput";

const registerFormSchema = z
	.object({
		email: z.string().email("Please enter a valid email"),
		displayName: z
			.string()
			.min(3, "Display name must be atleast 3 characters long."),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[A-Z]/, "Password must have at least one uppercase letter")
			.regex(/[a-z]/, "Password must have at least one lowercase letter")
			.regex(/\d/, "Password must have at least one number")
			.regex(/[\W_]/, "Password must have at least one special character"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerFormSchema>;

type Props = {};

function RegisterForm({}: Props) {
	const form = useForm<RegisterFormData>({
		validate: zodResolver(registerFormSchema),
		initialValues: {
			email: "",
			displayName: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: RegisterFormData) {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={16}>
				<TextInput
					label="Email"
					placeholder="you@example.com"
					classNames={{
						input: classes.input,
					}}
					leftSection={<AtSign size={20} />}
					{...form.getInputProps("email")}
				/>
				<TextInput
					label="Display Name"
					placeholder="TaskSlayer1337"
					classNames={{
						input: classes.input,
					}}
					leftSection={<User2 size={20} />}
					{...form.getInputProps("displayName")}
				/>
			</Stack>
			<ValidatedPasswordInput form={form} />
			<PasswordInput
				label="Confirm Password"
				placeholder="Confirm your password"
				mt="md"
				classNames={{
					input: classes.input,
				}}
				leftSection={<Lock size={20} />}
				{...form.getInputProps("confirmPassword")}
				onChange={(event) => {
					form.setFieldValue("confirmPassword", event.currentTarget.value);
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

export default RegisterForm;
