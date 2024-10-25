import { Drawer } from "@mantine/core";
import { DrawerProps } from "../../shared/drawer/drawer.types";

function InviteMemberDrawer({ isOpened, onClose }: DrawerProps) {
	return (
		<Drawer
			opened={isOpened}
			onClose={onClose}
			title="Invite Member"
			position="right"
		>
			Invite a new member
		</Drawer>
	);
}

export default InviteMemberDrawer;
