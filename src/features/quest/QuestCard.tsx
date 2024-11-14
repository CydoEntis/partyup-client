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
import { PriorityLevel } from "../../shared/types/prioty.types";

type QuestCardProps = {
	quest: Quest;
	onClick: () => void;
};

const getBadgeColor = (priority: PriorityLevel) => {
	switch (priority) {
		case PriorityLevel.CRITICAL:
			return "red";
		case PriorityLevel.HIGH:
			return "orange";
		case PriorityLevel.MEDIUM:
			return "yellow";
		case PriorityLevel.LOW:
		default:
			return "cyan";
	}
};

function QuestCard({ quest, onClick }: QuestCardProps) {
	const percent = getPercentage(quest.completedSteps, quest.steps.length);
	const { partyId } = useParams();
	const navigate = useNavigate();
	const test = () => {
		navigate(`/parties/${partyId}/quests/${quest.id}`);
		onClick();
	};

	const badgeColor = getBadgeColor(quest.priority);

	return (
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
				<Badge
					variant="light"
					color={badgeColor}
				>
					{quest.priority}
				</Badge>
				<p>{formatDate(quest.createdAt)}</p>
			</Group>

			<Stack
				mt="md"
				mb="xs"
			>
				<Title
					size="1.5rem"
					fw={600}
				>
					{quest.title}
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
					{quest.completedSteps}/{quest.steps.length}
				</Text>
			</Flex>

			<Group
				justify="space-between"
				pt={8}
			>
				<Members
					members={quest.members}
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
	);
}

export default QuestCard;
