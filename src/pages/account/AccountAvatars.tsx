import { Paper, Box, Title, Flex, Divider, Button } from "@mantine/core";
import { useState } from "react";
import { Unlock } from "lucide-react";
import NextAvatarUnlock from "./NextAvatarUnlock";
import UnlockableAvatars from "../../features/shop/UnlockableAvatars";
import { User } from "../../shared/types/auth.types";
import { Avatar } from "../../shared/types/avatar.types";

type AccountAvatarsProps = {
	user: User;
	avatars: Avatar[];
	tierOfAvatars: Avatar[];
};

function AccountAvatars({ user, avatars, tierOfAvatars }: AccountAvatarsProps) {
	const [isShowingAllUnlocks, setIsShowingAllUnlocks] = useState(false);

	return (
		<Paper
			withBorder
			p={16}
		>
			<Flex
				pb={10}
				justify="space-between"
				align="center"
			>
				<Title size="xl">Your Next Unlock</Title>
				<Button
					variant="light"
					color="violet"
					leftSection={<Unlock />}
					onClick={() => setIsShowingAllUnlocks((prevState) => !prevState)}
				>
					View All Unlocks
				</Button>
			</Flex>
			<Divider />
			<Box
				pos="relative"
				p={20}
			>
				{isShowingAllUnlocks ? (
					<UnlockableAvatars
						user={user}
						avatars={avatars}
					/>
				) : (
					<NextAvatarUnlock
						user={user}
						tierOfAvatars={tierOfAvatars}
					/>
				)}
			</Box>
		</Paper>
	);
}

export default AccountAvatars;
