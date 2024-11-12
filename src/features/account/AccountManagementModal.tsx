import { Modal } from "@mantine/core";
import useUserStore from "../../stores/useUserStore";
import AccountManagement from "./AccountManagement";

type AccountManagementModalProps = { isOpened: boolean; onClose: () => void };

function AccountManagementModal({ isOpened, onClose }: AccountManagementModalProps) {
	const { user } = useUserStore();
	return (
		<Modal
			opened={isOpened}
			onClose={onClose}
			title="Account Overview"
			size="lg"
			yOffset="10vh"
		>
			<AccountManagement user={user!} />
		</Modal>
	);
}

export default AccountManagementModal;
