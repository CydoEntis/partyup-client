import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";

type CampaignViewType = "edit" | "create";

function useQuestDrawer() {
	const { campaignId } = useParams();
	const [campaignViewType, setCampaignViewType] =
		useState<CampaignViewType>("create");

	const [
		openedInviteMember,
		{ open: openMemberInvite, close: closeMemberInvite },
	] = useDisclosure(false);

	const [openedCampaign, { open: openCampaign, close: closeCampaign }] =
		useDisclosure(false);

	const handleNewCampaign = () => {
		setCampaignViewType("create");
		openCampaign();
	};

	const handleEditCampaign = () => {
		setCampaignViewType("edit");
		openCampaign();
	};


	return {
		campaignViewType,
		setCampaignViewType,
		openedInviteMember,
		openMemberInvite,
		closeMemberInvite,
		openedCampaign,
		openCampaign,
		closeCampaign,
		handleNewCampaign,
		handleEditCampaign,
	};
}

export default useQuestDrawer;
