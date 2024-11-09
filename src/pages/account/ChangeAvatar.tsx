import { Modal, SimpleGrid } from "@mantine/core";
import { useEffect } from "react";
import useAvatarStore from "../../stores/useAvatarStore";
import UnlockedAvatar from "../../components/avatar/UnlockedAvatar";
import { User } from "../../shared/types/auth.types";

type ChangeAvatarProps = {
	changedAvatarOpened: boolean;
	onCloseChangeAvatar: () => void;
	user: User;
};

function ChangeAvatar({
	changedAvatarOpened,
	onCloseChangeAvatar,
	user,
}: ChangeAvatarProps) {
	const {
		getUnlockedAvatars,
		unlockedAvatars,
	} = useAvatarStore();

	useEffect(() => {
		const fetchUnlockedAvatars = async () => {
			await getUnlockedAvatars();
		};

		fetchUnlockedAvatars();
	}, [changedAvatarOpened]);

	return (
		<Modal
			opened={changedAvatarOpened}
			onClose={onCloseChangeAvatar}
			title="Change Avatar"
			centered
			size="lg"
		>
			<SimpleGrid cols={6}>
				{unlockedAvatars?.map((avatar) => (
					<UnlockedAvatar
						user={user}
						avatar={avatar}
					/>
				))}
			</SimpleGrid>
		</Modal>
	);
}

export default ChangeAvatar;
