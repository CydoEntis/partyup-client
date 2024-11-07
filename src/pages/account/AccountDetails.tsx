import { ActionIcon, Divider, Group, Paper, Title, Text } from "@mantine/core";
import { Edit } from "lucide-react";
import { User } from "../../shared/types/auth.types";

type AcountDetailsProps = { user: User };

function AccountDetails({ user }: AcountDetailsProps) {
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
				<Title size="xl">Account Details</Title>
				<ActionIcon
					variant="light"
					color="violet"
				>
					<Edit size={20} />
				</ActionIcon>
			</Group>
			<Divider />
			<Group
				justify="space-between"
				w="25%"
				py={12}
			>
				<Text>Display Name</Text>
				<Text>{user.displayName}</Text>
			</Group>
			<Group
				justify="space-between"
				w="25%"
				py={12}
			>
				<Text>Email</Text>
				<Text>{user.email}</Text>
			</Group>
		</Paper>
	);
}

export default AccountDetails;
