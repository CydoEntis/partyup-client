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
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./auth.module.css";

import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import useAuthStore from "../../stores/useAuthStore";
import { AxiosError } from "axios";

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
	const { login: loginUser, loading } = useAuthStore();
	const navigate = useNavigate();

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
		await loginUser(data);

		form.reset();
		navigate("/dashboard");
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
