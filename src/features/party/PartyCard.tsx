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
	Box,
} from "@mantine/core";
import { Calendar, ListChecks, MessageCircle } from "lucide-react";
import Members from "../../components/avatar/Members";
import { formatDate } from "../../shared/utils/date.utils";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Party } from "../../shared/types/party.types";

type PartyCardProps = {
	party: Party;
};

function PartyCard({ party }: PartyCardProps) {
	return (
		<Card
			component={NavLink}
			to={`/parties/${party.id}/quests`}
			key={party.id}
			className="transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
			bg={"card"}
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
		>
			<Box bg={party.color} w="100%" h="1px"></Box>
			<Stack
				mt="md"
				mb="xs"
				gap={8}
			>
				<Group
					justify="space-between"
				>
					<Group >
						<Title
							size="1.5rem"
							fw={600}
						>
							{party.title}
						</Title>
					</Group>
				</Group>
				<Text
					size="sm"
					c="dimmed"
				>
					{party.description}
				</Text>

				<Flex
					align="center"
					gap={8}
				>
					<Calendar size={20} />
					<Text>{formatDate(party.dueDate)}</Text>
				</Flex>
			</Stack>

			<Members
				members={party.members}
				numOfMembersToShow={3}
			/>
		</Card>
	);
}

export default PartyCard;
