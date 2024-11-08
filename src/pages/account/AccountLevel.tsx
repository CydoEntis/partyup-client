import {
	Avatar,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	Box,
} from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import useAvatar from "../../hooks/useGetAvatar";
import { Edit } from "lucide-react";

type AccountLevelProps = {
	user: User;
	onChangeAvatar: () => void;
};

function AccountLevel({ user, onChangeAvatar }: AccountLevelProps) {
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
				<Box
					className="relative group"
					onClick={onChangeAvatar}
				>
					<Avatar
						src={avatarImage}
						alt="User's avatar"
						bg="violet"
						size="xl"
						className="group-hover:brightness-75 transition-all duration-300 cursor-pointer"
					/>
					<Edit
						size={40}
						className="invisible group-hover:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer"
					/>
				</Box>

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

export default AccountLevel;
