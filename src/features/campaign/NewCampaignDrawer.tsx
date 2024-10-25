import { Drawer } from "@mantine/core";
import { DrawerProps } from "../../shared/drawer/drawer.types";

function NewCampaignDrawer({ isOpened, onClose }: DrawerProps) {
	return (
		<Drawer
			opened={isOpened}
			onClose={onClose}
			title="New Campaign"
			position="right"
		>
			This bitch open
		</Drawer>
	);
}

export default NewCampaignDrawer;
