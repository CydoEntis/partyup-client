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
	Checkbox,
	Avatar,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import Members from "../../components/avatar/Members";
import { Calendar, Check, Clock, Edit, Plus, Users2, X } from "lucide-react";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import CampaignHeader from "../../features/campaign/CampaignHeader";
import CampaignTabs from "../../features/campaign/CampaignTabs";
import { useDisclosure } from "@mantine/hooks";
import InviteCampaignMember from "../../features/campaign/InviteCampaignMember";
import CommentList from "../../components/comments/CommentList";
import TaskList from "../../components/tasks/TaskList";

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
				<Box
					px={32}
					h="100%"
				>
					<Flex
						direction="column"
						justify="space-between"
						className="min-h-[calc(100vh-70px)]"
					>
						<Box>
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
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Dolore iste ducimus culpa tenetur necessitatibus velit ut.
									Accusantium impedit eligendi saepe, ducimus incidunt iure
									eveniet nulla commodi fugit voluptatum nesciunt pariatur.
								</Text>
							</Stack>

							{/* Tasks Section */}
							<Stack>
								<TaskList
									title="Tasks"
									tasks={[]}
								/>
							</Stack>
						</Box>

						{/* Bottom Section (Comments pinned to bottom) */}
						<Box>
							<CommentList />
							<Flex
								gap={8}
								w="100%"
								py={32}
							>
								<Button
									leftSection={<Check size={20} />}
									variant="light"
									size="md"
									fullWidth
									color="violet"
								>
									Complete
								</Button>
								<Button
									leftSection={<X size={20} />}
									variant="light"
									size="md"
									fullWidth
									color="gray"
								>
									Cancel
								</Button>
							</Flex>
						</Box>
					</Flex>
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
