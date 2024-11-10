import { Overlay, Center, SimpleGrid, Box } from "@mantine/core";
import UnlockableAvatar from "../../components/avatar/UnlockableAvatar";
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
		<Box pos="relative" px={16} py={8}>
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
		</Box>
	);
}

export default NextUnlock;
