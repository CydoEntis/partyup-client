import {
	Anchor,
	Button,
	Checkbox,
	Group,
	Paper,
	PasswordInput,
	Popover,
	Progress,
	TextInput,
} from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";

import classes from "./auth.module.css";
import { useState } from "react";
import PasswordRequirement from "../../components/input/PasswordRequirement";
import {
	passwordRequirements,
	testPasswordStrength,
} from "../../shared/utils/password.utils";
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
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [passwordValue, setPasswordValue] = useState("");
	const checks = passwordRequirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(passwordValue)}
		/>
	));

	const strength = testPasswordStrength(passwordValue);
	const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

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
		<Paper
			withBorder
			shadow="md"
			p={30}
			mt={30}
			radius="md"
		>
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
				<Popover
					opened={popoverOpened}
					position="bottom"
					width="target"
					transitionProps={{ transition: "pop" }}
				>
					<Popover.Target>
						<div
							onFocusCapture={() => setPopoverOpened(true)}
							onBlurCapture={() => setPopoverOpened(false)}
						>
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
								{...form.getInputProps("password")} // Register password input
								onChange={(event) => {
									setPasswordValue(event.currentTarget.value); // Update local password state
									form.setFieldValue("password", event.currentTarget.value); // Update form state
								}}
							/>
						</div>
					</Popover.Target>
					<Popover.Dropdown>
						<Progress
							color={color}
							value={strength}
							size={5}
							mb="xs"
						/>
						<PasswordRequirement
							label="Includes at least 6 characters"
							meets={passwordValue.length > 5}
						/>
						{checks}
					</Popover.Dropdown>
				</Popover>

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
					type="submit" // Ensure button type is submit
				>
					Sign in
				</Button>
			</form>
		</Paper>
	);
}

export default LoginForm;
