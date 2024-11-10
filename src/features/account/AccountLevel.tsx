import { Group, Progress, Stack, Text } from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import { getPercentage } from "../../shared/utils/progress-bar.utils";

type AccountLevelProps = {
	user: User;
};

function AccountLevel({ user }: AccountLevelProps) {
	const percentage = user
		? getPercentage(user.currentExp, user.expToNextLevel)
		: 0;
	return (
		<Stack gap={2}>
			<Group justify="space-between">
				<Group>
					<Text size="md">Level</Text>
					<Text size="md">{user.currentLevel}</Text>
				</Group>
				<Text
					ta="center"
					size="sm"
				>
					{user.expToNextLevel - user.currentExp}xp till level up
				</Text>
			</Group>
			<Progress
				value={percentage}
				w="100%"
				size="md"
				animated
				color="violet"
			/>
		</Stack>
	);
}

export default AccountLevel;
