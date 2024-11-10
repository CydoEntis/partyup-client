import { ActionIcon, Flex, Group, Progress, Stack, Text } from "@mantine/core";
import { Edit } from "lucide-react";
import { User } from "../../shared/types/auth.types";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import { useState } from "react";

type UserDetailsProps = { user: User };

function UserDetails({ user }: UserDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);
	const percentage = user
		? getPercentage(user.currentExp, user.expToNextLevel)
		: 0;
	return (
		<Stack
			gap={12}
			w="100%"
		>
			<Flex
				justify="space-between"
			>
				<Stack gap={0}>
					<Text size="xs">Display Name</Text>
					<Text size="xl">{user.displayName}</Text>
				</Stack>
				<ActionIcon
					variant="light"
					color="violet"
				>
					<Edit />
				</ActionIcon>
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
		</Stack>
	);
}

export default UserDetails;
