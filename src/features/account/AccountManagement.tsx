import { Box, Flex, Stack } from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import ChangeAvatar from "../../components/avatar/ChangeAvatar";
import UserDetails from "../user/UserDetails";
import ChangePassword from "./ChangePassword";
import NextUnlock from "../../components/avatar/NextAvatarUnlock";

type AccountManagementProps = { user: User };

function AccountManagement({ user }: AccountManagementProps) {
	return (
		<Stack gap={20}>
			<Flex gap={30}>
				<ChangeAvatar user={user} />
				<UserDetails user={user} />
			</Flex>
			<NextUnlock user={user}/>
			<ChangePassword />
		</Stack>
	);
}

export default AccountManagement;
