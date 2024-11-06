import { Flex, Group, Progress, Stack, Text } from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import UserAvatar from "../../components/avatar/UserAvatar";
import { ChevronDown } from "lucide-react";

type UserLevelProps = {
	user: User;
};

function UserLevel({ user }: UserLevelProps) {
	const percentage = getPercentage(user.currentExp, user.expToNextLevel);
	return (
		<Flex align="center" gap={12}>
			<Group
				gap={8}
				w={200}
			>
				<UserAvatar avatar={user.avatar} />
				<Stack gap={6}>
					<Group
						justify="space-between"
						align="center"
						gap={6}
					>
						<Text>{user.displayName}</Text>
						<Text size="xs">Lv. {user.currentLevel}</Text>
					</Group>
					<Progress
						value={percentage}
						w={150}
						size="sm"
						animated
						color="violet"
					/>
				</Stack>
			</Group>
		</Flex>
	);
}

export default UserLevel;
