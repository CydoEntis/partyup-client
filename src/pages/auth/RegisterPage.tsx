import { Anchor, Box, Container, Title, Text, Paper } from "@mantine/core";
import { NavLink } from "react-router-dom";
import RegisterForm from "../../features/auth/RegisterForm";

type Props = {};

function RegisterPage({}: Props) {
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
					<Title ta="center">Let's Get You Signed Up!</Title>
					<Text
						c="dimmed"
						size="sm"
						ta="center"
						mt={5}
					>
						Already Have An Account?{" "}
						<Anchor
							component={NavLink}
							to="/login"
							size="sm"
							c="violet"
						>
							Log In
						</Anchor>
					</Text>

					<RegisterForm />
				</Paper>
			</Container>
		</Box>
	);
}

export default RegisterPage;
