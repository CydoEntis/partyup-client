import { useParams } from "react-router-dom";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import { useDisclosure } from "@mantine/hooks";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";

import InviteMemberDrawer from "../../features/members/InviteMemberDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { Campaign } from "../../shared/types/campaign.types";
import QuestDrawer from "../../features/quest/QuestDrawer";

type Props = {};

function CampaignPage({}: Props) {
	const { campaignId, questId } = useParams();
	const { getCampaign, loading } = useCampaignStore();
	const { getQuests, paginatedQuests } = useQuestStore();
	const [campaign, setCampaign] = useState<Campaign | null>(null);

	const [
		openedInviteMember,
		{ open: openMemberInvite, close: closeMemberInvite },
	] = useDisclosure(false);
	const [openedQuest, { open: openQuest, close: closeQuest }] =
		useDisclosure(false);

	const [questMode, setQuestMode] = useState("view");

	const handleNewQuest = () => {
		setQuestMode("create");
		openQuest();
	};

	const handleViewQuest = () => {
		setQuestMode("view");
		openQuest();
	};

	useEffect(() => {
		if (questId) {
			openQuest();
		}
	}, [questId]);

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
				mode={questMode}
				isOpened={openedQuest}
				onClose={closeQuest}
			/>

			{campaign && (
				<CampaignHeader
					title={campaign!.name}
					onNewQuestHandler={handleNewQuest}
				>
					<InviteCampaignMember onOpenHandler={openMemberInvite} />
				</CampaignHeader>
			)}
			{paginatedQuests && (
				<CampaignTabs
					onOpenQuestHandler={handleViewQuest}
					quests={paginatedQuests.items}
				/>
			)}
		</>
	);
}

export default CampaignPage;
