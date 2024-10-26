import { useParams } from "react-router-dom";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import { useDisclosure } from "@mantine/hooks";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";

import InviteMemberDrawer from "../../features/members/InviteMemberDrawer";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { Campaign } from "../../shared/types/campaign.types";

type Props = {};

function CampaignPage({}: Props) {
	const { campaignId } = useParams();
	const { getCampaign, loading } = useCampaignStore();
	const { getQuests, paginatedQuests } = useQuestStore();
	const [campaign, setCampaign] = useState<Campaign | null>(null);

	const [
		openedInviteMember,
		{ open: openMemberInvite, close: closeMemberInvite },
	] = useDisclosure(false);
	const [openedQuest, { open: openViewQuest, close: closeQuest }] =
		useDisclosure(false);

	useEffect(() => {
		const fetchCampaign = async () => {
			if (campaignId) {
				const campaignData = await getCampaign(Number(campaignId));
				setCampaign(campaignData);
				getQuests(Number(campaignId));
			}
		};

		fetchCampaign();
	}, [campaignId]);


	return (
		<>
			<InviteMemberDrawer
				isOpened={openedInviteMember}
				onClose={closeMemberInvite}
			/>
			<QuestDrawer
				isOpened={openedQuest}
				onClose={closeQuest}
			/>

			{campaign && (
				<CampaignHeader title={campaign!.name}>
					<InviteCampaignMember onOpenHandler={openMemberInvite} />
				</CampaignHeader>
			)}
			{paginatedQuests && (
				<CampaignTabs
					onOpenQuestHandler={openViewQuest}
					quests={paginatedQuests.items}
				/>
			)}
		</>
	);
}

export default CampaignPage;
