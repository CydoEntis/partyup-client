import { Flex, Group, Progress, Stack, Text } from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import UserAvatar from "../../components/avatar/UserAvatar";

type UserLevelProps = {
	user: User;
};

function UserLevel({ user }: UserLevelProps) {
	const percentage = getPercentage(user.currentExp, user.expToNextLevel);
	return (
		<Flex
			align="center"
			gap={12}
		>
			<Group
				gap={8}
				w={200}
			>
				<UserAvatar avatar={user.avatar} />
				<Stack gap={1}>
					<Group
						justify="space-between"
						align="center"
						gap={6}
						w={150}
					>
						<Text className="truncate ...">{user.displayName}</Text>
					</Group>
					<Group>
						<Text size="xs">Lv. {user.currentLevel}</Text>
						<Progress
							value={percentage}
							w={110}
							size="sm"
							animated
							color="violet"
						/>
					</Group>
				</Stack>
			</Group>
		</Flex>
	);
}

export default UserLevel;
