import { Avatar, Group, Paper, Progress, Stack, Text } from '@mantine/core';
import { User } from '../../shared/types/auth.types';
import { getPercentage } from '../../shared/utils/progress-bar.utils';
import useAvatar from '../../hooks/useGetAvatar';

type AccountLevelProps = {
	user: User,
}

function AccountLevel({user}: AccountLevelProps) {
	const percentage = user
		? getPercentage(user.currentExp, user.expToNextLevel)
		: 0;
	const avatarImage = user ? useAvatar(user.avatar.id) : undefined;

	return (
		<Paper
			withBorder
			p={16}
		>
			<Group pb={16}>
				<Avatar
					src={avatarImage}
					alt="User's avatar"
					bg="violet"
					size="xl"
				/>
				<Text size="xl">{user.displayName}</Text>
			</Group>
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
						{user.currentExp} exp / {user.expToNextLevel} exp
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
		</Paper>
	);
}

export default AccountLevel