import {
	Box,
	Flex,
	Stack,
	Title,
	Text,
	Button,
	Drawer,
	Badge,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { Calendar, Check, Clock, Edit, Plus, Users2, X } from "lucide-react";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import { useDisclosure } from "@mantine/hooks";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";
import CommentList from "../../components/comments/CommentList";
import TaskList from "../../components/tasks/TaskList";
import InviteMemberDrawer from "../../features/members/InviteMemberDrawer";
import ViewQuestDrawer from "../../features/quest/ViewQuestDrawer";

type Props = {};

function CampaignPage({}: Props) {
	const { campaignId } = useParams();
	const [
		openedInviteMember,
		{ open: openMemberInvite, close: closeMemberInvite },
	] = useDisclosure(false);
	const [openedViewQuest, { open: openViewQuest, close: closeViewQuest }] =
		useDisclosure(false);

	return (
		<>
			<InviteMemberDrawer
				isOpened={openedInviteMember}
				onClose={closeMemberInvite}
			/>
			<ViewQuestDrawer
				isOpened={openedViewQuest}
				onClose={closeViewQuest}
			/>
			<CampaignHeader>
				<InviteCampaignMember onOpenHandler={openMemberInvite} />
			</CampaignHeader>
			<CampaignTabs onOpenQuestHandler={openViewQuest} />
		</>
	);
}

export default CampaignPage;
