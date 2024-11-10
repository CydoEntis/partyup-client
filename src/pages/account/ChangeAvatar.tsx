import { Avatar, Box, Modal, Paper, Popover, ScrollArea, SimpleGrid, Tooltip } from "@mantine/core";
import { useEffect } from "react";
import useAvatarStore from "../../stores/useAvatarStore";
import UnlockedAvatar from "../../components/avatar/UnlockedAvatar";
import { User } from "../../shared/types/auth.types";
import Test from "../../features/user/AccountOverview";
import { Edit2 } from "lucide-react";
import useAvatar from "../../hooks/useGetAvatar";

type ChangeAvatarProps = {

	user: User;
};

function ChangeAvatar({
	user,
}: ChangeAvatarProps) {
	const avatarImage = user ? useAvatar(user.avatar.id) : undefined;


	const {
		getUnlockedAvatars,
		unlockedAvatars,
	} = useAvatarStore();


	useEffect(() => {
		const fetchUnlockedAvatars = async () => {
			await getUnlockedAvatars();
		};

		fetchUnlockedAvatars();
	}, []);


	return (
		<Popover
			position="bottom"
			withArrow
			shadow="md"
		>
			<Popover.Target>
				<Box>
					<Tooltip label="Change Avatar">
						<Box className="relative">
							<Avatar
								src={avatarImage}
								alt="User's avatar"
								bg="violet"
								size="xl"
								className="cursor-pointer"
							/>

							<Paper
								radius="100%"
								bg="violet"
								p={6}
								withBorder
								className="absolute -bottom-1 right-0 cursor-pointer"
							>
								<Edit2 size={14} />
							</Paper>
						</Box>
					</Tooltip>
				</Box>
			</Popover.Target>
			<Popover.Dropdown>
				<ScrollArea h={250}>
					<SimpleGrid
						cols={3}
						spacing="xs"
					>
						{unlockedAvatars?.map((avatar) => (
							<UnlockedAvatar
								user={user}
								avatar={avatar}
							/>
						))}
					</SimpleGrid>
				</ScrollArea>
			</Popover.Dropdown>
		</Popover>
	);
}

export default ChangeAvatar;
