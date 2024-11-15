import {
	Card,
	Stack,
	Title,
	Group,
	Text,
	Box,
	Tooltip,
	Badge,
	rem,
	Paper,
	Flex,
} from "@mantine/core";
import Members from "../../components/avatar/Members";
import { NavLink } from "react-router-dom";
import { Party } from "../../shared/types/party.types";
import { CalendarX, CheckCircle2, CircleCheck, Loader } from "lucide-react";
import { formatDate } from "../../shared/utils/date.utils";

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
			mih={350}
		>
			<Box
				bg={party.color}
				w="100%"
				h="1px"
			></Box>
			<Stack
				mt="md"
				mb="xs"
				gap={8}
				style={{ flex: 1 }}
			>
				<Group justify="space-between">
					<Group>
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
			</Stack>

			<Members
				members={party.members}
				numOfMembersToShow={3}
			/>

			<Stack>
				<Paper
					withBorder
					p={8}
					mt={16}
					bg="secondary"
				>
					<Stack
						gap={8}
						align="center"
					>
						<Text>Quest Progress</Text>
						<Group>
							<Tooltip label={"Completed"}>
								<Badge
									size="lg"
									color="lime"
									variant="light"
									leftSection={
										<CircleCheck style={{ width: rem(16), height: rem(16) }} />
									}
								>
									{party.questStats.completedQuests}
								</Badge>
							</Tooltip>
							<Tooltip label={"In Progress"}>
								<Badge
									size="lg"
									color="yellow"
									variant="light"
									leftSection={
										<Loader style={{ width: rem(16), height: rem(16) }} />
									}
								>
									{party.questStats.inProgressQuests}
								</Badge>
							</Tooltip>
							<Tooltip label={"Past Due"}>
								<Badge
									size="lg"
									color="red"
									variant="light"
									leftSection={
										<CalendarX style={{ width: rem(16), height: rem(16) }} />
									}
								>
									{party.questStats.pastDueQuests}
								</Badge>
							</Tooltip>
						</Group>
					</Stack>
				</Paper>
				<Flex
					justify="flex-end"
					pt={16}
				>
					<Text
						size="xs"
						c="gray"
					>
						Last Accessed: {formatDate(party.updatedAt)}
					</Text>
				</Flex>
			</Stack>
		</Card>
	);
}

export default PartyCard;
