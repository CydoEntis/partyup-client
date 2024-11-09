import { Overlay, Center, SimpleGrid, Box, Divider } from "@mantine/core";
import { useEffect } from "react";
import UnlockableAvatar from "../../components/avatar/UnlockableAvatar";
import useAvatarStore from "../../stores/useAvatarStore";
import { Lock } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";

type NextUnlockProps = {};

function NextUnlock({}: NextUnlockProps) {
	const { user } = useAuthStore();
	const {
		getNextUnlockableTier,
		nextUnlockableTierOfAvatars,
		loading: { nextTier },
	} = useAvatarStore();

	useEffect(() => {
		const loadNextTierOfAvatars = async () => {
			try {
				await getNextUnlockableTier();
			} catch (error) {
				console.error("Error loading next unlockable tier:", error);
			}
		};

		loadNextTierOfAvatars();
	}, [getNextUnlockableTier]);

	return (
		<Box
			pos="relative"
			p={20}
		>
			{nextTier ? (
				<p>Loading...</p>
			) : (
				<>
					<Overlay
						color="gray"
						opacity={0.25}
						radius="md"
					/>
					<Center
						pos="absolute"
						top="50%"
						left="50%"
						style={{ transform: "translate(-50%, -50%)" }}
					>
						<Lock
							size={48}
							color="white"
						/>
					</Center>
					<SimpleGrid cols={12}>
						{nextUnlockableTierOfAvatars?.length && user ? (
							nextUnlockableTierOfAvatars.map((avatar) => (
								<UnlockableAvatar
									key={avatar.id}
									avatar={avatar}
									user={user}
								/>
							))
						) : (
							<p>No avatars available to unlock.</p>
						)}
					</SimpleGrid>
				</>
			)}
		</Box>
	);
}

export default NextUnlock;
