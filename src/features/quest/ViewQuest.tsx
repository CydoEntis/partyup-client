import { Badge, Box, Button, Flex, Stack, Title, Text } from "@mantine/core";
import { Clock, Check } from "lucide-react";
import CommentList from "../../components/comments/CommentList";
import { formatDate } from "../../shared/utils/date.utils";
import StepList from "../../components/steps/StepList";
import useUserStore from "../../stores/useUserStore";
import useQuestStore from "../../stores/useQuestStore";
import PriortyBadge from "../../components/badge/PriortyBadge";

function ViewQuest() {
	const { completeQuest, uncompleteQuest, quest } = useQuestStore();
	const { user } = useUserStore();

	const memberRole = quest
		? quest.members.find((member) => member.userId === user?.id)?.role
		: null;

	const isAssignedToQuest = memberRole !== undefined;

	const handleComplete = async () => {
		if (quest && isAssignedToQuest) {
			await completeQuest(quest.partyId, quest.id);
		}
	};

	const handleUncomplete = async () => {
		if (quest && isAssignedToQuest) {
			await uncompleteQuest(quest.partyId, quest.id);
		}
	};

	return (
		<Flex
			direction="column"
			justify="space-between"
			className="min-h-[calc(100vh-120px)]"
			style={{ overflow: "hidden" }}
		>
			<Box>
				<Flex
					justify="space-between"
					py={16}
				>
					<PriortyBadge priority={quest!.priority} />

					<Badge
						size="lg"
						variant="outline"
						color="gray"
						leftSection={<Clock size={16} />}
					>
						{quest && formatDate(quest.dueDate)}
					</Badge>
				</Flex>

				<Stack py={16}>
					<Title size="xl">Description</Title>
					<Text
						style={{
							whiteSpace: "normal",
							wordBreak: "break-word",
							overflowWrap: "break-word",
						}}
					>
						{quest?.description}
					</Text>
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
					{!quest?.isCompleted && isAssignedToQuest ? (
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

					{(memberRole === "Owner" || memberRole === "Captain") &&
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
