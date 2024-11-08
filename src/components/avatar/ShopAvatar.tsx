import {
	Box,
	Avatar as MantineAvatar,
	Text,
	Group,
	Image,
	Stack,
} from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { forwardRef } from "react";
import { Avatar } from "../../shared/types/avatar.types";
import { Lock } from "lucide-react";
import Coin from "../../assets/coin.png";
import { User } from "../../shared/types/auth.types";

type ShopAvatarProps = {
	avatar: Avatar;
	user: User;
	onClick?: () => void;
};

const ShopAvatar = forwardRef<HTMLDivElement, ShopAvatarProps>(
	({ avatar, user, onClick }, ref) => {
		const avatarImage = useAvatar(avatar.id);

		return (
			<Stack
				justify="center"
				align="center"
				gap={4}
			>
				<Box
					className={`relative ${!avatar.isUnlocked ? "cursor-pointer" : ""}`}
					onClick={
						!avatar.isUnlocked && user.currentLevel >= avatar.unlockLevel
							? onClick
							: undefined
					}
				>
					<MantineAvatar
						ref={ref}
						src={avatarImage}
						alt={avatar.name}
						bg="violet"
						size="lg"
						className={!avatar.isUnlocked ? "brightness-50" : ""}
					/>
					{!avatar.isUnlocked ? (
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
							<Lock className="text-white" />
						</div>
					) : null}
				</Box>
				<Stack
					gap={0}
					justify="center"
					align="center"
				>
					<Text size="xs">{avatar.displayName}</Text>
					{avatar.isUnlocked ? (
						<Text
							size="xs"
							ta="center"
							pt={4}
						>
							Unlocked
						</Text>
					) : (
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
	},
);

export default ShopAvatar;
