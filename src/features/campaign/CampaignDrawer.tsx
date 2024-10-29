import { Box, Drawer, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useDrawerData from "../../hooks/useDrawerData";
import useCampaignStore from "../../stores/useCampaignStore";
import { Campaign } from "../../shared/types/campaign.types";
import UpsertCampaignForm from "./UpsertCampaignDrawer";

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
					{drawerMode === "create" ? "Create a Campaign" : "Edit Campaign"}
				</Title>
				<UpsertCampaignForm campaign={campaign} />
			</Box>
		</Drawer>
	);
}

export default CampaignDrawer;
