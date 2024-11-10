import {
	ActionIcon,
	Divider,
	Group,
	Paper,
	Title,
	Text,
	Flex,
} from "@mantine/core";
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import AccountDetailsForm from "./AccountDetailsForm";
import { User } from "../../shared/types/auth.types";

type AccountDetailsProps = {
	user: User | null;
};

function AccountDetails({ user }: AccountDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		setIsEditing((prevState) => !prevState);
	};

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
					onClick={handleEditing}
				>
					{isEditing ? <X size={20} /> : <Edit size={20} />}
				</ActionIcon>
			</Group>
			<Divider />
			{isEditing && user ? (
				<AccountDetailsForm
					user={user}
					onClose={() => setIsEditing(false)}
				/>
			) : (
				user && (
					<>
						<Flex
							justify="space-between"
							py={12}
						>
							<Text
								w="50%"
								fw={700}
							>
								Display Name:
							</Text>
							<Text
								w="50%"
								ta="left"
							>
								{user.displayName}
							</Text>
						</Flex>
						<Flex
							justify="space-between"
							py={12}
						>
							<Text
								w="50%"
								fw={700}
							>
								Email:
							</Text>
							<Text
								w="50% "
								ta="left"
							>
								{user.email}
							</Text>
						</Flex>
					</>
				)
			)}
		</Paper>
	);
}

export default AccountDetails;
