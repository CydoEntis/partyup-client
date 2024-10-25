import React from "react";
import LoginForm from "../../features/auth/LoginForm";
import {
	Button,
	Checkbox,
	Container,
	Paper,
	PasswordInput,
	TextInput,
	Title,
	Text,
	Group,
	Anchor,
	Center,
	Box,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

type Props = {};

function LoginPage({}: Props) {
	return (
		<Box
			className="min-h-[75vh] flex justify-center items-center"
		>
			<Container
				w="100%"
				maw={520}
			>
				<Title ta="center">Welcome back!</Title>
				<Text
					c="dimmed"
					size="sm"
					ta="center"
					mt={5}
				>
					Don't have an account yet?{" "}
					<Anchor
						component={NavLink}
						to="/register"
						size="sm"
						c="violet"
					>
						Create account
					</Anchor>
				</Text>

				<LoginForm />
			</Container>
		</Box>
	);
}

export default LoginPage;
