import { Box, Flex, Stack } from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import ChangeAvatar from "../../pages/account/ChangeAvatar";
import UserDetails from "./UserDetails";
import ChangePassword from "../../pages/account/ChangePassword";
import NextUnlock from "../../pages/account/NextAvatarUnlock";

type AccountOverviewProps = { user: User };

function AccountOverview({ user }: AccountOverviewProps) {
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

export default AccountOverview;
