import { Badge, Box, Button, Flex, Stack, Title, Text } from "@mantine/core";
import { Clock, Check, X } from "lucide-react";
import CommentList from "../../components/comments/CommentList";
import { formatDate } from "../../shared/utils/date.utils";
import { Quest } from "../../shared/types/quest.types";
import StepList from "../../components/steps/StepList";

type ViewQuestProps = { quest: Quest };

function ViewQuest({ quest }: ViewQuestProps) {
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
						{formatDate(quest.dueDate)}
					</Badge>
				</Flex>

				<Stack py={16}>
					<Title size="xl">Description</Title>
					<Text>{quest.description}</Text>
				</Stack>

				{/* Tasks Section */}
				<Stack>
					<StepList
						title="Tasks"
						steps={quest.steps}
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
	);
}

export default ViewQuest;
