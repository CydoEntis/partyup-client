import CampaignTabs from "../../features/campaign/CampaignTabs";
import InviteMemberModal from "../../features/members/InviteMemberModal";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useCampaignDrawer from "../../hooks/useCampaignDrawer";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import CampaignDrawer from "../../features/campaign/CampaignDrawer";
import CampaignHeaderSkeleton from "../../features/loading-skeletons/CampaignHeaderSkeleton";
import useCampaignStore from "../../stores/useCampaignStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CampaignHeader from "../../features/campaign/CampaignHeader";

type Props = {};

function CampaignPage({}: Props) {
	const { campaignId } = useParams();
	const {
		getCampaign,
		campaign,
		loading: campaignLoading,
	} = useCampaignStore();

	useEffect(() => {
		const fetchCampaign = async () => {
			if (campaignId) {
				try {
					await getCampaign(campaignId);
				} catch (error) {
					console.error("Error fetching campaign or quests:", error);
				}
			}
		};

		fetchCampaign();
	}, [campaignId, getCampaign]);

	const { questViewType, openedQuest, closeQuest, handleNewQuest } =
		useQuestDrawer();

	const {
		openMemberInvite,
		closeMemberInvite,
		openedInviteMember,
		openedCampaign,
		closeCampaign,
		handleEditCampaign,
	} = useCampaignDrawer();

	return (
		<>
			<InviteMemberModal
				isOpened={openedInviteMember}
				onClose={closeMemberInvite}
			/>
			<QuestDrawer
				viewType={questViewType}
				isOpened={openedQuest}
				onClose={closeQuest}
			/>
			{campaign && (
				<CampaignDrawer
					isOpened={openedCampaign}
					onClose={closeCampaign}
					drawerMode="edit"
					campaign={campaign}
				/>
			)}
			{campaignLoading ? (
				<CampaignHeaderSkeleton />
			) : campaign ? (
				<CampaignHeader
					title={campaign.title}
					members={campaign.members}
					handleEditCampaign={handleEditCampaign}
					handleNewQuest={handleNewQuest}
					openMemberInvite={openMemberInvite}
				/>
			) : (
				<div>No campaign found</div>
			)}

			<CampaignTabs />
		</>
	);
}

export default CampaignPage;
