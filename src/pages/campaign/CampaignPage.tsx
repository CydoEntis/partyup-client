import {
	Box,
	Flex,
	Group,
	Stack,
	Title,
	Text,
	ActionIcon,
	Button,
	Drawer,
	Badge,
	rem,
	Collapse,
	Tooltip,
	ScrollArea,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import Members from "../../components/avatar/Members";
import { Calendar, Clock, Edit, Plus, Users2 } from "lucide-react";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import { useDisclosure } from "@mantine/hooks";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";

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
			<Drawer
				opened={openedInviteMember}
				onClose={closeMemberInvite}
				title="Invite Member"
				position="right"
			>
				Invite a new member
			</Drawer>
			<Drawer
				size="xl"
				opened={openedViewQuest}
				onClose={closeViewQuest}
				position="right"
			>
				<Box px={32}>
					<Title size="2rem">Set Up Pi 5 Server</Title>
					<Flex
						justify="space-between"
						py={16}
					>
						<Badge
							variant="light"
							color="yellow"
							size="lg"
						>
							Urgent
						</Badge>

						<Badge
							size="lg"
							variant="outline"
							color="gray"
							leftSection={<Clock size={16} />}
						>
							Nov 22, 2024
						</Badge>
					</Flex>

					<Stack py={16}>
						<Title size="xl">Description</Title>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
							iste ducimus culpa tenetur necessitatibus velit ut. Accusantium
							impedit eligendi saepe, ducimus incidunt iure eveniet nulla
							commodi fugit voluptatum nesciunt pariatur.
						</Text>
					</Stack>
					<Stack>
						<Title size="xl">Tasks</Title>
						<ScrollArea
							h={250}
							type="scroll"
						>
							<Text>Task 1</Text>
							<Text>Task 2</Text>
							<Text>Task 3</Text>
							<Text>Task 4</Text>
							<Text>Task 5</Text>
							<Text>Task 6</Text>
							<Text>Task 7</Text>
						</ScrollArea>
					</Stack>
				</Box>
			</Drawer>
			<CampaignHeader>
				<InviteCampaignMember onOpenHandler={openMemberInvite} />
			</CampaignHeader>
			<CampaignTabs onOpenQuestHandler={openViewQuest} />
		</>
	);
}

export default CampaignPage;
