import {
	Anchor,
	Button,
	Checkbox,
	Group,
	Paper,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";

import classes from "./auth.module.css";

import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";

const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email"),
	password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginFormSchema>;

type Props = {};

function LoginForm({}: Props) {
	const form = useForm<LoginFormData>({
		validate: zodResolver(loginFormSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormData) {
		try {
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				label="Email"
				placeholder="you@example.com"
				classNames={{
					input: classes.input,
				}}
				leftSection={<AtSign size={20} />}
				{...form.getInputProps("email")} // Register email input
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				withAsterisk
				required
				mt="md"
				classNames={{
					input: classes.input,
				}}
				leftSection={<Lock size={20} />}
				{...form.getInputProps("password")}
				onChange={(event) => {
					form.setFieldValue("password", event.currentTarget.value);
				}}
			/>
			<Group
				justify="space-between"
				mt="lg"
			>
				<Checkbox label="Remember me" />
				<Anchor
					component={NavLink}
					size="sm"
					c="violet"
					to={"/forgot-password"}
				>
					Forgot password?
				</Anchor>
			</Group>
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

export default LoginForm;
