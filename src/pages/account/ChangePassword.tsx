import {
	Divider,
	Group,
	Paper,
	Title,
	Text,
	Stack,
	Button,
	TextInput,
} from "@mantine/core";
import { AtSign, Mail } from "lucide-react";

type ChangePasswordProps = {};

function ChangePassword({}: ChangePasswordProps) {
	return (
		<Paper pt={12}>
			<Group
				align="center"
				justify="space-between"
				pb={10}
			>
				<Title size="xl">Need to change your password?</Title>
			</Group>
			<Divider />
			<Stack
				gap={12}
				py={8}
			>

				<form>
					<TextInput
						label="Email"
						placeholder="you@example.com"
						// classNames={{
						// 	input: classes.input,
						// }}
						leftSection={<Mail size={20} />}
						// {...form.getInputProps("email")} // Register email input
					/>
				</form>
				<Button
					variant="light"
					color="violet"
					fullWidth
				>
					Request Password Reset
				</Button>
			</Stack>
		</Paper>
	);
}

export default ChangePassword;
