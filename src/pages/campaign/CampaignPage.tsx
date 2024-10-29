import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";

import InviteMemberDrawer from "../../features/members/InviteMemberDrawer";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useFetchCampaign from "../../hooks/useFetchCampaign";
import useFetchQuests from "../../hooks/useFetchQuests";
import useQuestDrawer from "../../hooks/useQuestDrawer";

type Props = {};

function CampaignPage({}: Props) {
	const { campaign, loading: campaignLoading } = useFetchCampaign();
	const {
		openMemberInvite,
		closeMemberInvite,
		questMode,
		openedQuest,
		closeQuest,
		handleNewQuest,
		openedInviteMember,
	} = useQuestDrawer();

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
					title={campaign!.title}
					onNewQuestHandler={handleNewQuest}
				>
					<InviteCampaignMember onOpenHandler={openMemberInvite} />
				</CampaignHeader>
			)}
			<CampaignTabs />
		</>
	);
}

export default CampaignPage;
