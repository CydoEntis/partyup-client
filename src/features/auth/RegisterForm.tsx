import {
	Avatar,
	Box,
	Button,
	PasswordInput,
	SimpleGrid,
	Stack,
	TextInput,
	Text,
	Paper,
} from "@mantine/core";
import { AtSign, Lock, User2, Check } from "lucide-react";

import classes from "./auth.module.css";

import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import ValidatedPasswordInput from "../../components/input/ValidatedPasswordInput";
import useUserStore from "../../stores/useUserStore";
import { AxiosError } from "axios";
import { useState } from "react";
import MaleA from "../../assets/male_a.png";
import MaleB from "../../assets/male_b.png";
import FemaleA from "../../assets/female_a.png";
import FemaleB from "../../assets/female_b.png";
import { useNavigate } from "react-router-dom";

const registerFormSchema = z
	.object({
		email: z.string().email("Please enter a valid email"),
		displayName: z
			.string()
			.min(3, "Display name must be at least 3 characters long."),
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

function RegisterForm() {
	const [selectedAvatar, setSelectedAvatar] = useState(1);
	const navigate = useNavigate();
	const startAvatars = [
		{ id: 1, src: MaleA, name: "Male A" },
		{ id: 2, src: MaleB, name: "Male B" },
		{ id: 3, src: FemaleA, name: "Female A" },
		{ id: 4, src: FemaleB, name: "Female B" },
	];

	const { register } = useUserStore();
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
			const newUser = {
				...data,
				avatarId: selectedAvatar,
			};

			await register(newUser);
			form.reset();
			navigate("/dashboard");
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data) {
				console.log(error.response.data);
				const errors = error.response.data as Record<string, string>;
				const fieldErrors: Record<string, string> = {};
				for (const [key, message] of Object.entries(errors)) {
					fieldErrors[key] = message;
				}
				console.log(fieldErrors);
				form.setErrors(fieldErrors);
			}
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
				<Text size="sm">Select Your Avatar</Text>
				<SimpleGrid cols={4}>
					{startAvatars.map((avatar) => (
						<Stack
							justify="center"
							align="center"
							gap={2}
							key={avatar.id}
							style={{ position: "relative" }}
							onClick={() => setSelectedAvatar(avatar.id)}
						>
							<Avatar
								bg="violet"
								src={avatar.src}
								style={{
									cursor: "pointer",
									position: "relative",
								}}
							/>
							{selectedAvatar === avatar.id && (
								<Paper
									withBorder
									pos="absolute"
									bg="violet"
									c="lime"
									radius="100%"
									style={{
										bottom: 15,
										right: 20,
									}}
								>
									<Check size={16} />
								</Paper>
							)}
							<Text
								size="xs"
								ta="center"
							>
								{avatar.name}
							</Text>
						</Stack>
					))}
				</SimpleGrid>
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
				Sign up
			</Button>
		</form>
	);
}

export default RegisterForm;
