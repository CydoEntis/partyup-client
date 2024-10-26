import {
	Drawer,
	Flex,
	Title,
	Stack,
	Button,
	Badge,
	Text,
	Box,
} from "@mantine/core";
import CommentList from "../../components/comments/CommentList";
import TaskList from "../../components/tasks/TaskList";
import { Check, Clock, X } from "lucide-react";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { formatDate } from "../../shared/utils/date.utils";
import { Quest } from "../../shared/types/quest.types";

function ViewQuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getQuest } = useQuestStore();
	const navigate = useNavigate();
	const [quest, setQuest] = useState<Quest | null>(null);
	console.log(questId);
	useEffect(() => {
		const fetchQuest = async () => {
			if (campaignId && questId) {
				const questData = await getQuest(Number(campaignId), Number(questId));
				console.log(questData);

				setQuest(questData);
			}
		};

		if (isOpened) {
			fetchQuest();
		} else {
			setQuest(null); // Clear quest data when the drawer closes
		}
	}, [isOpened, questId, getQuest]);

	const handleClose = () => {
		navigate(`/campaigns/${campaignId}/quests`);
		onClose();
	};

	return (
		<Drawer
			size="xl"
			opened={isOpened}
			onClose={handleClose}
			position="right"
		>
			{quest ? (
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
							<Title size="2rem">{quest.name}</Title>
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
									{formatDate(quest.dueDate)}
								</Badge>
							</Flex>

							<Stack py={16}>
								<Title size="xl">Description</Title>
								<Text>{quest.description}</Text>
							</Stack>

							{/* Tasks Section */}
							<Stack>
								<TaskList
									title="Tasks"
									tasks={quest.tasks}
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
			) : null}
		</Drawer>
	);
}

export default ViewQuestDrawer;
