import {
	Card,
	Indicator,
	Stack,
	Title,
	Flex,
	Progress,
	Group,
	Text,
	Badge,
} from "@mantine/core";

import { Calendar, ListChecks, MessageCircle } from "lucide-react";

import Members from "../../components/avatar/Members";
import { Quest } from "../../shared/types/quest.types";
import { formatDate } from "../../shared/utils/date.utils";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import { useNavigate, useParams } from "react-router-dom";

type QuestCardProps = {
	quest: Quest;
	onClick: () => void;
};

function QuestCard({ quest, onClick }: QuestCardProps) {
	const percent = getPercentage(quest.completedTasks, quest.totalTasks);
	const { campaignId } = useParams();
	const navigate = useNavigate();
	const test = () => {
		navigate(`/campaigns/${campaignId}/quests/${quest.id}`, { replace: true });
		onClick();
	};

	return (
		<>
			<Card
				key={quest.id}
				className="transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
				bg={"card"}
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				onClick={test}
			>
				<Group
					pb={12}
					justify="space-between"
				>
					<Group>
						<Indicator
							inline
							processing
							color="yellow"
							size={8}
						></Indicator>
						<Text size="xs">In Progress</Text>
					</Group>

					<Badge
						variant="light"
						color="yellow"
					>
						Urgent
					</Badge>
				</Group>

				<Stack
					mt="md"
					mb="xs"
				>
					<Title
						size="1.5rem"
						fw={600}
					>
						{quest.name}
					</Title>
					<Text
						size="sm"
						c="dimmed"
					>
						{quest.description}
					</Text>

					<Flex
						align="center"
						gap={8}
					>
						<Calendar size={20} />
						<Text>{formatDate(quest.dueDate)}</Text>
					</Flex>
				</Stack>

				<Flex
					gap={4}
					align="center"
				>
					<Progress
						w="90%"
						color="yellow"
						radius="xl"
						size="md"
						value={percent}
						striped
						animated
					/>
					<ListChecks size={20} />
					<Text>
						{quest.completedTasks}/{quest.totalTasks}
					</Text>
				</Flex>

				<Group
					justify="space-between"
					pt={8}
				>
					<Members
						members={quest.assignedMembers}
						totalMembers={quest.totalMembers}
						numOfMembersToShow={3}
					/>
					<Flex
						gap={4}
						align="center"
					>
						<MessageCircle size={20} />
						<Text>3</Text>
					</Flex>
				</Group>
			</Card>
		</>
	);
}

export default QuestCard;
