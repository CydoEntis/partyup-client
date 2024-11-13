import { Divider, Flex, Image, Paper, Title, Text, Group } from "@mantine/core";
import NextUnlock from "../../components/avatar/NextAvatarUnlock";
import { User } from "../../shared/types/auth.types";
import UserLevel from "../user/UserLevel";
import Coin from "../../assets/coin.png";
 
type UserProgressProps = {
	user: User;
};

function UserProgression({ user }: UserProgressProps) {
	return (
		<Paper
			withBorder
			style={{ height: "100%" }}
			p={16}
		>
			<Flex justify="space-between" py={12}>
				<UserLevel user={user} />
				<Group gap={4} align="center">
					<Text size="xl">{user.currency}</Text>
					<Image src={Coin} w={20} />
				</Group>
			</Flex>

			<Title
				pb={8}
				size="xl"
			>
				Your Next Unlock
			</Title>
			<Divider pb={8} />
			<NextUnlock user={user} />
		</Paper>
	);
}

export default UserProgression;
