import { Button, Flex, Modal, Text } from "@mantine/core";

type UnlockAvatarModal = {
	isUnlockAvatarOpen: boolean;
	onCloseUnlockAvatar: () => void;
};

function UnlockAvatarModal({ isUnlockAvatarOpen, onCloseUnlockAvatar }: UnlockAvatarModal) {
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
				Action cannot be reverted
			</Text>
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
