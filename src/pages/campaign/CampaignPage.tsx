import { ActionIcon, Button, Flex, Group, Title } from "@mantine/core";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";

import InviteMemberModal from "../../features/members/InviteMemberModal";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useCampaignDrawer from "../../hooks/useCampaignDrawer";
import useFetchCampaign from "../../hooks/useFetchCampaign";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import { Edit, Plus } from "lucide-react";
import CampaignDrawer from "../../features/campaign/CampaignDrawer";

type Props = {};

function CampaignPage({}: Props) {
	const { campaign } = useFetchCampaign();
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
					<InviteCampaignMember
						members={campaign.members}
						onOpenHandler={openMemberInvite}
					/>
				</CampaignHeader>
			)}
			<CampaignTabs />
		</>
	);
}

export default CampaignPage;
