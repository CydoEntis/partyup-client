import { Box, Drawer, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";

import { Campaign } from "../../shared/types/party.types";
import UpsertCampaignForm from "./UpsertCampaignForm";

type CampaignDrawerProps = DrawerProps & {
	campaign?: Campaign;
	drawerMode: "create" | "edit";
};

function CampaignDrawer({
	isOpened,
	onClose,
	drawerMode,
	campaign,
}: CampaignDrawerProps) {
	return (
		<Drawer
			size="xl"
			opened={isOpened}
			onClose={onClose}
			position="right"
		>
			<Box
				px={32}
				h="100%"
			>
				<Title size="2rem">
					{drawerMode === "create"
						? "Create a Campaign"
						: `Editing: ${campaign?.title} `}
				</Title>
				<UpsertCampaignForm
					campaign={campaign}
					onClose={onClose}
				/>
			</Box>
		</Drawer>
	);
}

export default CampaignDrawer;
