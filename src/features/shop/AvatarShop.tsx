import { SimpleGrid, Box, Stack, Divider, Tooltip } from "@mantine/core";
import useAuthStore from "../../stores/useAuthStore";
import useAvatarStore from "../../stores/useAvatarStore";
import ShopAvatar from "../../components/avatar/ShopAvatar";
import { AvatarShopItem } from "../../shared/types/avatar.types";
import { useEffect } from "react";

type AvatarShopProps = {
	onUnlock: () => void;
};

function AvatarShop({ onUnlock }: AvatarShopProps) {
	const { user } = useAuthStore();
	const { avatars, getAvatarShop } = useAvatarStore();

	useEffect(() => {
		const loadAvatarShop = async () => {
			if (user) {
				await getAvatarShop(user.id);
			}
		};

		loadAvatarShop();
	}, [getAvatarShop]);

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

				return (
					<Box key={tier}>
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
									user={user!}
									onClick={onUnlock}
								/>
							))}
						</SimpleGrid>
					</Box>
				);
			})}
		</Stack>
	);
}

export default AvatarShop;
