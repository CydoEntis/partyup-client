import {
	Box,
	Group,
	Stack,
	Avatar as MantineAvatar,
	Text,
	Image,
} from "@mantine/core";
import { Avatar } from "../../shared/types/avatar.types";
import useAvatar from "../../hooks/useGetAvatar";
import Coin from "../../assets/coin.png";

type AvatarUnlockPreviewProps = { avatar: Avatar };

function AvatarUnlockPreview({ avatar }: AvatarUnlockPreviewProps) {
	const avatarImage = useAvatar(avatar.id);
	return (
		<Stack
			pt={16}
			justify="center"
			align="center"
			gap={4}
		>
			<Box>
				<MantineAvatar
					src={avatarImage}
					alt={avatar.displayName}
					bg="violet"
					size="lg"
				/>
			</Box>
			<Stack
				gap={0}
				justify="center"
				align="center"
			>
				<Text
					ta="center"
					size="xs"
				>
					{avatar.displayName}
				</Text>
				{avatar.isUnlocked ? null : (
					<Group
						pt={4}
						align="center"
						justify="center"
						gap={4}
					>
						<Text
							size="sm"
							p={0}
						>
							{avatar.cost}
						</Text>
						<Image
							src={Coin}
							w={14}
						/>
					</Group>
				)}
			</Stack>
		</Stack>
	);
}

export default AvatarUnlockPreview;
