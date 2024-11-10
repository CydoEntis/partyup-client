import { Overlay, Center, SimpleGrid, Box, Divider } from "@mantine/core";
import UnlockableAvatar from "./UnlockableAvatar";
import { Lock } from "lucide-react";
import { User } from "../../shared/types/auth.types";
import useAvatarStore from "../../stores/useAvatarStore";
import { useEffect } from "react";

type NextUnlockProps = {
	user: User;
};

function NextUnlock({ user }: NextUnlockProps) {
	const { getNextUnlockableTier, nextUnlockableTierOfAvatars } =
		useAvatarStore();

	useEffect(() => {
		const getNextUnlock = async () => {
			try {
				await getNextUnlockableTier();
			} catch (error) {
				console.error("Error loading next unlockable tier:", error);
			}
		};
		getNextUnlock();
	}, [getNextUnlockableTier]);

	return (
		<Box pos="relative" px={32} py={16}>
			<>
			<Divider label={`Your next unlocks`} labelPosition="center" pb={8}/>
				<Overlay
					color="gray"
					opacity={0.25}
					radius="sm"
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
		</Box>
	);
}

export default NextUnlock;
