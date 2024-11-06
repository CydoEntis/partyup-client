import {
	Modal,
	Text,
	SimpleGrid,
	Box,
	Stack,
	Divider,
	Image,
	Group,
	Tooltip,
	Flex,
} from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import useAuthStore from "../../stores/useAuthStore";
import useAvatarStore from "../../stores/useAvatarStore";
import ShopAvatar from "../../components/avatar/ShopAvatar";
import { AvatarShopItem } from "../../shared/types/avatar.types";

import Coin from "../../assets/coin.png";
import UserAvatar from "../../components/avatar/UserAvatar";

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

	return (
		<Modal
			opened={isOpened}
			onClose={onClose}
			title="Purchase an Avatar"
			centered
			size="lg"
		>
			<Stack>
				<Flex justify="space-between">
					<Group>
						<UserAvatar avatar={user!.avatar} />
						<Text>{user?.displayName}</Text>
					</Group>
					<Group
						align="center"
						gap={12}
					>
						<Text
							size="xl"
							p={0}
						>
							{user?.currency}
						</Text>
						<Image
							src={Coin}
							w={20}
						/>
					</Group>
				</Flex>

				{Object.keys(groupedByTier).map((tier) => {
					const avatarsByTier = groupedByTier[+tier];
					return (
						<Box key={tier}>
							<Divider
								my="xs"
								label={`Tier ${tier}`}
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
											<ShopAvatar avatar={avatar} />
										</Tooltip>
										<Group
											align="center"
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
									</Stack>
								))}
							</SimpleGrid>
						</Box>
					);
				})}
			</Stack>
		</Modal>
	);
}

export default AvatarShop;
