import { Modal } from "@mantine/core";
import useAuthStore from "../../stores/useAuthStore";
import AccountManagement from "./AccountManagement";

type AccountManagementModalProps = { isOpened: boolean; onClose: () => void };

function AccountManagementModal({ isOpened, onClose }: AccountManagementModalProps) {
	const { user } = useAuthStore();
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
