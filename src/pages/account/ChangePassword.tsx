import {
	Divider,
	Group,
	Paper,
	Title,
	Text,
	Stack,
	Button,
} from "@mantine/core";

type ChangePasswordProps = {};

function ChangePassword({}: ChangePasswordProps) {
	return (
		<Paper
			withBorder
			p={16}
		>
			<Group
				align="center"
				justify="space-between"
				pb={10}
			>
				<Title size="xl">Change Password</Title>
			</Group>
			<Divider />
			<Stack
				gap={12}
				py={8}
			>
				<Text pb={12}>Need to change your password?</Text>
				<Button
					variant="light"
					color="violet"
					fullWidth
				>
					Change Password
				</Button>
			</Stack>
		</Paper>
	);
}

export default ChangePassword;
