import { Overlay, Center, SimpleGrid, Box } from "@mantine/core";
import UnlockableAvatar from "../../components/avatar/UnlockableAvatar";
import { Lock } from "lucide-react";
import { Avatar } from "../../shared/types/avatar.types";
import { User } from "../../shared/types/auth.types";

type NextUnlockProps = {
	user: User;
	tierOfAvatars: Avatar[];
};

function NextUnlock({
	user, tierOfAvatars
}: NextUnlockProps) {

	return (
		<Box
			pos="relative"
			p={20}
		>
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
					{tierOfAvatars?.length && user ? (
						tierOfAvatars.map((avatar) => (
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
