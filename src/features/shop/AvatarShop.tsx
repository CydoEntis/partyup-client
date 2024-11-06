import { Modal, SimpleGrid, Box, Stack, Divider, Tooltip } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import useAuthStore from "../../stores/useAuthStore";
import useAvatarStore from "../../stores/useAvatarStore";
import ShopAvatar from "../../components/avatar/ShopAvatar";
import { AvatarShopItem } from "../../shared/types/avatar.types";
import ShopHeader from "./ShopHeader";
import { useDisclosure } from "@mantine/hooks";

function AvatarShop({ isOpened, onClose }: DrawerProps) {
	const { user } = useAuthStore();
	const { avatars } = useAvatarStore();

	const groupedByTier =
		avatars?.reduce((acc, avatar) => {
			if (!acc[avatar.tier]) {
				acc[avatar.tier] = [];
			}
			acc[avatar.tier].push(avatar);
			return acc;
		}, {} as { [tier: number]: AvatarShopItem[] }) || {};

	const unlockHandler = () => {
		open();
		console.log("Can Unlock");
	};
  const [opened, { open, close }] = useDisclosure(false);
	return (
		<>
			<Modal
				opened={isOpened}
				onClose={onClose}
				title="Purchase an Avatar"
				centered
				size="lg"
			>
				<Stack>
					<ShopHeader user={user!} />
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
									cols={4}
									spacing="md"
								>
									{avatarsByTier.map((avatar) => (
										<Stack
											key={avatar.id}
											justify="center"
											align="center"
										>
											<Tooltip label={avatar.displayName}>
												<ShopAvatar
													avatar={avatar}
													user={user!}
													onClick={unlockHandler}
												/>
											</Tooltip>
										</Stack>
									))}
								</SimpleGrid>
							</Box>
						);
					})}
				</Stack>
			</Modal>
		</>
	);
}

export default AvatarShop;
