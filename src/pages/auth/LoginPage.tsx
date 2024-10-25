import LoginForm from "../../features/auth/LoginForm";
import { Container, Paper, Title, Text, Anchor, Box } from "@mantine/core";
import { NavLink } from "react-router-dom";

type Props = {};

function LoginPage({}: Props) {
	return (
		<Box mt={250}>
			<Container
				w="100%"
				maw={520}
			>
				<Paper
					withBorder
					shadow="md"
					p={30}
					mt={30}
					radius="md"
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
				</Paper>
			</Container>
		</Box>
	);
}

export default LoginPage;
