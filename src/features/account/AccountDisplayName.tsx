import { Stack, Text } from "@mantine/core";
import { User } from "../../shared/types/auth.types";

type AccountDisplayNameProps = { user: User };

function AccountDisplayName({ user }: AccountDisplayNameProps) {
	return (
		<Stack gap={0}>
			<Text size="xs">Display Name</Text>
			<Text size="xl">{user.displayName}</Text>
		</Stack>
	);
}

export default AccountDisplayName;
