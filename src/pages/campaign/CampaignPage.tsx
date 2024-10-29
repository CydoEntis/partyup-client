import { ActionIcon, Button, Flex, Group, Title } from "@mantine/core";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";
import UpsertCampaignForm from "../../features/campaign/UpsertCampaignDrawer";

import InviteMemberDrawer from "../../features/members/InviteMemberDrawer";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useCampaignDrawer from "../../hooks/useCampaignDrawer";
import useFetchCampaign from "../../hooks/useFetchCampaign";
import useFetchQuests from "../../hooks/useFetchQuests";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import { Edit, Plus } from "lucide-react";
import CampaignDrawer from "../../features/campaign/CampaignDrawer";

type Props = {};

function CampaignPage({}: Props) {
	const { campaign, loading: campaignLoading } = useFetchCampaign();
	const { questViewType, openedQuest, closeQuest, handleNewQuest } =
		useQuestDrawer();

	const {
		openMemberInvite,
		closeMemberInvite,
		openedInviteMember,
		campaignViewType,
		openedCampaign,
		openCampaign,
		closeCampaign,
		handleEditCampaign,
	} = useCampaignDrawer();

	return (
		<>
			<InviteMemberDrawer
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
					campaign={campaign}
				/>
			)}

			{campaign && (
				<CampaignHeader>
					<Flex
						justify="space-between"
						align="center"
						w="100%"
						pb={16}
					>
						<Group
							align="center"
							w="100%"
							justify="space-between"
						>
							<Group>
								<Title size="2.5rem">{campaign.title}</Title>
								<ActionIcon
									variant="transparent"
									color="violet"
									onClick={handleEditCampaign}
								>
									<Edit size={20} />
								</ActionIcon>
							</Group>
							<Button
								variant="light"
								color="violet"
								rightSection={<Plus />}
								onClick={handleNewQuest}
							>
								New Quest
							</Button>
						</Group>
					</Flex>
					<InviteCampaignMember onOpenHandler={openMemberInvite} />
				</CampaignHeader>
			)}
			<CampaignTabs />
		</>
	);
}

export default CampaignPage;
