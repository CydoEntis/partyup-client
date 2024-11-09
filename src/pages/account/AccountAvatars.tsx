import { Paper, Box, Title, Flex, Divider, Button } from "@mantine/core";
import { useState } from "react";
import { Unlock } from "lucide-react";
import NextAvatarUnlock from "./NextAvatarUnlock";
import UnlockableAvatars from "../../features/shop/UnlockableAvatars";

type AccountAvatarsProps = {};

function AccountAvatars({}: AccountAvatarsProps) {
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
				{isShowingAllUnlocks ? <UnlockableAvatars /> : <NextAvatarUnlock />}
			</Box>
		</Paper>
	);
}

export default AccountAvatars;
