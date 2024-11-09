import {
	Avatar,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	Box,
	Tooltip,
	Flex,
} from "@mantine/core";
import { User } from "../../shared/types/auth.types";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import useAvatar from "../../hooks/useGetAvatar";
import { Edit2 } from "lucide-react";
import ThemeToggle from "../../features/theme/ThemeToggle";

type AccountLevelProps = {
	user: User;
	onOpenChangeAvatar: () => void;
};

function AccountLevel({ user, onOpenChangeAvatar }: AccountLevelProps) {
	const percentage = user
		? getPercentage(user.currentExp, user.expToNextLevel)
		: 0;
	const avatarImage = user ? useAvatar(user.avatar.id) : undefined;

	return (
		<Paper
			withBorder
			p={16}
		>
			<Flex justify="space-between">
				<Group pb={16}>
					<Tooltip label="Change Avatar">
						<Box
							className="relative"
							onClick={onOpenChangeAvatar}
						>
							<Avatar
								src={avatarImage}
								alt="User's avatar"
								bg="violet"
								size="xl"
								className="cursor-pointer"
							/>

							<Paper
								radius="100%"
								bg="violet"
								p={6}
								withBorder
								className="absolute -bottom-1 right-0 cursor-pointer"
							>
								<Edit2 size={14} />
							</Paper>
						</Box>
					</Tooltip>

					<Text size="xl">{user.displayName}</Text>
				</Group>
				<ThemeToggle />
			</Flex>
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
