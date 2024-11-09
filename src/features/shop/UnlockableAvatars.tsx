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
	Title,
} from "@mantine/core";
import { Lock } from "lucide-react";
import UnlockableAvatar from "../../components/avatar/UnlockableAvatar";
import { Avatar } from "../../shared/types/avatar.types";
import Coin from "../../assets/coin.png";

import { useDisclosure } from "@mantine/hooks";
import UnlockAvatarModal from "../avatar/UnlockAvatarModal";
import { User } from "../../shared/types/auth.types";

type UnlockableAvatarsProps = {
	user: User;
	avatars: Avatar[];
};

function UnlockableAvatars({ user, avatars }: UnlockableAvatarsProps) {
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
									px={16}
								>
									<Divider
										my="xs"
										label={`Tier ${tier} (unlocked at level ${unlockLevel})`}
										labelPosition="center"
									/>

									<SimpleGrid
										cols={10}
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
