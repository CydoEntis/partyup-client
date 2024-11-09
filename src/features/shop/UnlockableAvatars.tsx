import {
	SimpleGrid,
	Box,
	Stack,
	Divider,
	Overlay,
	Center,
	Paper,
	Group,
	Image,
	Text,
	Title,
} from "@mantine/core";
import { Lock } from "lucide-react";
import UnlockableAvatar from "../../components/avatar/UnlockableAvatar";
import { Avatar } from "../../shared/types/avatar.types";
import Coin from "../../assets/coin.png";
import useAvatarStore from "../../stores/useAvatarStore";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import UnlockAvatarModal from "../avatar/UnlockAvatarModal";

function UnlockableAvatars() {
	const { avatars, getAvatars } = useAvatarStore();
	const { user } = useAuthStore();

	const [
		confirmUnlockOpened,
		{ open: openUnlockAvatar, close: closeUnlockAvatar },
	] = useDisclosure(false);

	const groupedByTier =
		avatars?.reduce((acc, avatar) => {
			if (!acc[avatar.tier]) {
				acc[avatar.tier] = [];
			}
			acc[avatar.tier].push(avatar);
			return acc;
		}, {} as { [tier: number]: Avatar[] }) || {};

	useEffect(() => {
		const loadNextTierOfAvatars = async () => {
			if (user) {
				await getAvatars();
			}
		};
		loadNextTierOfAvatars();
	}, [user, getAvatars]);

	return (
		<>
			<UnlockAvatarModal
				isUnlockAvatarOpen={confirmUnlockOpened}
				onCloseUnlockAvatar={closeUnlockAvatar}
			/>
			{user ? (
				<Paper>
					<Center w="100%">
						<Group>
							<Title size="1.85rem">{user.currency}</Title>
							<Image
								src={Coin}
								w={32}
							/>
						</Group>
					</Center>

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
											<UnlockableAvatar
												key={avatar.id}
												avatar={avatar}
												user={user}
												onClick={isTierLocked ? undefined : openUnlockAvatar}
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
				</Paper>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default UnlockableAvatars;