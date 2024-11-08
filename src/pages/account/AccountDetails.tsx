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
import { User } from "../../shared/types/auth.types";
import { useState } from "react";
import AccountDetailsForm from "./AccountDetailsForm";

type AcountDetailsProps = { user: User };

function AccountDetails({ user }: AcountDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		if (isEditing) {
			console.log("Saving...");
		}
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
					{isEditing ? <Save size={20} /> : <Edit size={20} />}
				</ActionIcon>
			</Group>
			<Divider />
			{isEditing ? (
				<AccountDetailsForm user={user} />
			) : (
				<>
					<Flex
						justify="space-between"
						py={12}
					>
						<Text w="50%" fw={700}>Display Name:</Text>
						<Text
							w="50%"
							ta="left"
						>
							{user.displayName}
						</Text>
					</Flex>
					<Group
						justify="space-between"
						w="25%"
						py={12}
					>
						<Text fw={700}>Email:</Text>
						<Text>{user.email}</Text>
					</Group>
				</>
			)}
		</Paper>
	);
}

export default AccountDetails;
