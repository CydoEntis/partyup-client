import { ActionIcon, Box, Flex, Stack } from "@mantine/core";
import { Edit, Save } from "lucide-react";
import { User } from "../../shared/types/auth.types";
import { useState } from "react";
import AccountLevel from "../account/AccountLevel";
import AccountDisplayName from "../account/AccountDisplayName";
import UpdateDisplayNameForm from "../../pages/account/UpdateDisplayNameForm";

type UserDetailsProps = { user: User };

function UserDetails({ user }: UserDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsEditing(true);
	};

	const updateHandler = () => {
		setIsEditing(false);
	};

	return (
		<Stack
			gap={12}
			w="100%"
		>
			<Flex justify="space-between">
				{isEditing ? (
					<>
						<UpdateDisplayNameForm
							user={user}
							onClose={updateHandler}
						/>
						<ActionIcon
							variant="light"
							color="violet"
							type="submit"
							form="updateDisplayNameForm"
						>
							<Save size={20} />
						</ActionIcon>
					</>
				) : (
					<>
						<AccountDisplayName user={user} />
						<ActionIcon
							variant="light"
							color="violet"
							type="button"
							onClick={editHandler}
						>
							<Edit size={20} />
						</ActionIcon>
					</>
				)}
			</Flex>
			<AccountLevel user={user} />
		</Stack>
	);
}

export default UserDetails;
