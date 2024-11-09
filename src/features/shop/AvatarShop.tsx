import {
	SimpleGrid,
	Box,
	Stack,
	Divider,
	Overlay,
	Center,
} from "@mantine/core";
import { Lock } from "lucide-react";
import ShopAvatar from "../../components/avatar/ShopAvatar";
import { Avatar } from "../../shared/types/avatar.types";
import { User } from "../../shared/types/auth.types";

type AvatarShopProps = {
	onUnlockAvatar: (avatar: Avatar) => void;
	avatars: Avatar[];
	user: User;
};

function AvatarShop({ onUnlockAvatar, avatars, user }: AvatarShopProps) {
	const groupedByTier =
		avatars?.reduce((acc, avatar) => {
			if (!acc[avatar.tier]) {
				acc[avatar.tier] = [];
			}
			acc[avatar.tier].push(avatar);
			return acc;
		}, {} as { [tier: number]: Avatar[] }) || {};

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
									onClick={
										isTierLocked ? undefined : () => onUnlockAvatar(avatar)
									}
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
