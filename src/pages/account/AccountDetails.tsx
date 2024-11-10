import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import AccountLevel from "./AccountLevel";
import useAuthStore from "../../stores/useAuthStore";
import AccountOverview from "../../features/user/AccountOverview";

type AccountDetailsProps = { isOpened: boolean; onClose: () => void };

function AccountDetails({ isOpened, onClose }: AccountDetailsProps) {
	const { user } = useAuthStore();
	return (
		<Modal
			opened={isOpened}
			onClose={onClose}
			title="Account Overview"
			yOffset="10vh"
			size="lg"
		>
			<AccountOverview user={user!} />
		</Modal>
	);
}

export default AccountDetails;
