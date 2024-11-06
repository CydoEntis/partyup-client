import { Box, Avatar as MantineAvatar, Text, Group, Image } from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { forwardRef } from "react";
import { AvatarShopItem } from "../../shared/types/avatar.types";
import { Lock } from "lucide-react";
import Coin from "../../assets/coin.png";

type ShopAvatarProps = { avatar: AvatarShopItem };

const ShopAvatar = forwardRef<HTMLDivElement, ShopAvatarProps>(
	({ avatar }, ref) => {
		const avatarImage = useAvatar(avatar.id);

		return (
			<Box>
				<Box className="relative">
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
							<Lock />
						</div>
					) : null}
				</Box>
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
			</Box>
		);
	},
);

export default ShopAvatar;
