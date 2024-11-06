import {
	SimpleGrid,
	Box,
	Stack,
	Divider,
	Tooltip,
	Overlay,
	Center,
	Text,
} from "@mantine/core";
import { Lock } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import ShopAvatar from "../../components/avatar/ShopAvatar";
import { AvatarShopItem } from "../../shared/types/avatar.types";
import { User } from "../../shared/types/auth.types";

type AvatarShopProps = {
	onUnlock: () => void;
	avatars: AvatarShopItem[];
	user: User;
};

function AvatarShop({ onUnlock, avatars, user }: AvatarShopProps) {
	const groupedByTier =
		avatars?.reduce((acc, avatar) => {
			if (!acc[avatar.tier]) {
				acc[avatar.tier] = [];
			}
			acc[avatar.tier].push(avatar);
			return acc;
		}, {} as { [tier: number]: AvatarShopItem[] }) || {};

	return (
		<Stack>
			{Object.keys(groupedByTier).map((tier) => {
				const avatarsByTier = groupedByTier[+tier];
				const unlockLevel = avatarsByTier[0]?.unlockLevel;
				const isTierLocked = user.currentLevel < unlockLevel;

				return (
					<Box
						key={tier}
						pos="relative"
					>
						<Divider
							my="xs"
							label={`Tier ${tier} (unlocked at level ${unlockLevel})`}
							labelPosition="center"
						/>

						<SimpleGrid
							cols={12}
							spacing="md"
						>
							{avatarsByTier.map((avatar) => (
								<ShopAvatar
									key={avatar.id}
									avatar={avatar}
									user={user}
									onClick={isTierLocked ? undefined : onUnlock}
								/>
							))}
						</SimpleGrid>

						{isTierLocked && (
							<>
								<Overlay
									color="gray"
									opacity={0.5}
									radius="md"
								/>
								<Center
									pos="absolute"
									top="50%"
									left="50%"
								>
									<Lock
										size={48}
										color="white"
									/>
								</Center>
							</>
						)}
					</Box>
				);
			})}
		</Stack>
	);
}

export default AvatarShop;
