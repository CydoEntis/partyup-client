import {
	Box,
	Avatar as MantineAvatar,
	Text,
	Stack,
	Paper,
	Tooltip,
} from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { Avatar } from "../../shared/types/avatar.types";
import { User } from "../../shared/types/auth.types";
import { Check } from "lucide-react";
import useUserStore from "../../stores/useUserStore";

type UnlockedAvatarProps = {
	user: User;
	avatar: Avatar;
};

const UnlockedAvatar = ({ user, avatar }: UnlockedAvatarProps) => {
	const avatarImage = useAvatar(avatar.id);
	const { updateAvatar } = useUserStore();

	const handleSetAvatar = async () => {
		await updateAvatar(avatar.id);
	};

	return (
		<Stack
			justify="center"
			align="center"
			gap={2}
		>
			<Box
				className="cursor-pointer relative hover:brightness-75 duration-300 ease-in-out transition-all"
				onClick={handleSetAvatar}
			>
				{user.avatar.id === avatar.id ? (
					<Paper
						radius="100%"
						bg="lime"
						p={2}
						withBorder
						className="absolute -bottom-1 right-0 cursor-pointer z-10"
					>
						<Check size={12} />
					</Paper>
				) : null}
				<MantineAvatar
					src={avatarImage}
					alt={avatar.name}
					bg="violet"
					size="lg"
				/>
			</Box>
			<Text ta="center" size="xs">{avatar.displayName}</Text>
		</Stack>
	);
};

export default UnlockedAvatar;
