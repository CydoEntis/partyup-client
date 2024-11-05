import { Badge, Box, Button, Flex, Stack, Title, Text } from "@mantine/core";
import { Clock, Check } from "lucide-react";
import CommentList from "../../components/comments/CommentList";
import { formatDate } from "../../shared/utils/date.utils";
import StepList from "../../components/steps/StepList";
import useAuthStore from "../../stores/useAuthStore";
import useQuestStore from "../../stores/useQuestStore";

function ViewQuest() {
	const { completeQuest, uncompleteQuest, quest } = useQuestStore();
	const { user } = useAuthStore();

	const userRole = quest
		? quest.members.find((member) => member.userId === user?.id)?.role
		: null;

	const handleComplete = async () => {
		if (quest) {
			await completeQuest(quest.campaignId, quest.id);
		}
	};

	const handleUncomplete = async () => {
		if (quest) {
			await uncompleteQuest(quest.campaignId, quest.id);
		}
	};

	return (
		<Flex
			direction="column"
			justify="space-between"
			className="min-h-[calc(100vh-120px)]"
		>
			<Box>
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
						{quest && formatDate(quest.dueDate)} {/* Ensure quest is defined */}
					</Badge>
				</Flex>

				<Stack py={16}>
					<Title size="xl">Description</Title>
					<Text>{quest?.description}</Text> {/* Use optional chaining */}
				</Stack>

				<Stack>
					<StepList
						title="Tasks"
						quest={quest!}
					/>
				</Stack>
			</Box>

			<Box>
				<CommentList />
				<Flex
					gap={8}
					w="100%"
					py={32}
				>
					{!quest?.isCompleted ? (
						<Button
							leftSection={<Check size={20} />}
							variant="light"
							size="md"
							fullWidth
							color="violet"
							onClick={handleComplete}
						>
							Mark Complete
						</Button>
					) : null}
					{(userRole === "Owner" || userRole === "Captain") &&
					quest?.isCompleted ? (
						<Button
							leftSection={<Check size={20} />}
							variant="light"
							size="md"
							fullWidth
							color="gray"
							onClick={handleUncomplete}
						>
							Mark Incomplete
						</Button>
					) : null}
				</Flex>
			</Box>
		</Flex>
	);
}

export default ViewQuest;
