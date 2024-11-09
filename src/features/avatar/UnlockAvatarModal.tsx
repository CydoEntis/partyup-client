import { Button, Flex, Modal, Text } from "@mantine/core";
import { Avatar } from "../../shared/types/avatar.types";

import AvatarUnlockPreview from "../../components/avatar/AvatarUnlockPreview";

type UnlockAvatarModal = {
	isUnlockAvatarOpen: boolean;
	onCloseUnlockAvatar: () => void;
	avatarToUnlock: Avatar | null;
};

function UnlockAvatarModal({
	isUnlockAvatarOpen,
	onCloseUnlockAvatar,
	avatarToUnlock,
}: UnlockAvatarModal) {
	return (
		<Modal
			opened={isUnlockAvatarOpen}
			onClose={onCloseUnlockAvatar}
			title="Unlock Avatar?"
			centered
		>
			<Text ta="center">Are you sure you want to unlock this avatar?</Text>

			<Text
				size="xs"
				c="red"
				ta="center"
			>
				Action cannot be undone.
			</Text>
			<AvatarUnlockPreview avatar={avatarToUnlock!} />
			<Flex
				justify="space-evenly"
				gap={8}
				mt={20}
			>
				<Button
					w="100%"
					variant="light"
					color="violet"
					onClick={() => {
						onCloseUnlockAvatar();
					}}
				>
					Confirm
				</Button>
				<Button
					w="100%"
					variant="light"
					color="gray"
					onClick={close}
				>
					Cancel
				</Button>
			</Flex>
		</Modal>
	);
}

export default UnlockAvatarModal;
