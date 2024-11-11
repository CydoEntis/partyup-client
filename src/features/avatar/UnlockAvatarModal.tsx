import { Box, Button, Flex, Modal, Text } from "@mantine/core";
import { Avatar } from "../../shared/types/avatar.types";

import AvatarUnlockPreview from "../../components/avatar/AvatarUnlockPreview";
import useAvatarStore from "../../stores/useAvatarStore";
import { AxiosError } from "axios";
import { useState } from "react";
import useAuthStore from "../../stores/useAuthStore";

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
	const { unlockAvatar } = useAvatarStore();
	const [error, setError] = useState<Record<string, string>>();
	const unlockAvatarHandler = async () => {
		try {
			if (avatarToUnlock) {
				await unlockAvatar(avatarToUnlock.id);
				onCloseUnlockAvatar();
			}
		} catch (error) {
			if (error instanceof AxiosError && error.response?.data?.errors) {
				const errors = error.response.data.errors as Record<string, string[]>;
				const fieldErrors: Record<string, string> = {};

				for (const [key, messages] of Object.entries(errors)) {
					if (Array.isArray(messages) && messages.length > 0) {
						fieldErrors[key] = messages[0];
					}
				}

				setError(fieldErrors);
			}
		}
	};

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
			<Box>
				{Object.entries(error || {}).map(([field, message]) => (
					<Text
					pt={8}
						size="xs"
						c="red"
						ta="center"
						key={field}
					>
						{message}
					</Text>
				))}
			</Box>

			<Flex
				justify="space-evenly"
				gap={8}
				mt={20}
			>
				<Button
					w="100%"
					variant="light"
					color="violet"
					onClick={unlockAvatarHandler}
				>
					Confirm
				</Button>
				<Button
					w="100%"
					variant="light"
					color="gray"
					onClick={onCloseUnlockAvatar}
				>
					Cancel
				</Button>
			</Flex>
		</Modal>
	);
}

export default UnlockAvatarModal;
