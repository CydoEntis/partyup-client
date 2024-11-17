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
	Indicator,
} from "@mantine/core";
import Members from "../../components/avatar/Members";
import { NavLink } from "react-router-dom";
import { Party } from "../../shared/types/party.types";
import {
	CalendarFoldIcon,
	CalendarX,
	CircleCheck,
	Crown,
	Loader,
	Users,
} from "lucide-react";
import { formatDate } from "../../shared/utils/date.utils";
import UserAvatar from "../../components/avatar/UserAvatar";

type PartyCardProps = {
	party: Party;
};

function PartyCard({ party }: PartyCardProps) {
	const creator = party.members.find(
		(member) => member.role.toLowerCase() === "creator",
	);
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
			<Stack
				mt="md"
				mb="xs"
				gap={8}
				style={{ flex: 1 }}
			>
				<Group justify="space-between">
					<Group>
						<Indicator
							color={party.color}
							size={8}
							processing
						/>
						<Title
							size="1.5rem"
							fw={600}
						>
							{party.title}
						</Title>
					</Group>
					<p>{formatDate(party.createdAt)}</p>
				</Group>
				<Text
					size="sm"
					c="dimmed"
				>
					{party.description}
				</Text>
			</Stack>

			<Flex
				justify="space-between"
				align="center"
			>
				{creator && (
					<Stack gap={8}>
						<Group gap={4}>
							<Crown
								color="yellow"
								size={14}
							/>
							<Text size="xs">Creator</Text>
						</Group>
						<Tooltip label={creator.displayName}>
							<UserAvatar avatar={creator.avatar} />
						</Tooltip>
					</Stack>
				)}

				<Stack gap={4}>
					<Group gap={4}>
						<Users size={14} />
						<Text size="xs">Members</Text>
					</Group>
					<Members
						members={party.members}
						numOfMembersToShow={3}
					/>
				</Stack>
			</Flex>

			<Stack>
				<Paper
					withBorder
					p={8}
					mt={16}
					bg="secondary"
					shadow="none"
				>
					<Stack
						gap={8}
						align="center"
					>
						<Text size="sm">Quest Progress</Text>
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
					justify="space-between"
					pt={16}
					align={"center"}
				>
					<Text
						size="xs"
						c="gray"
					>
						Last Accessed
					</Text>
					<Group
						gap={8}
						align="center"
					>
						<CalendarFoldIcon size={14} />
						<Text
							size="xs"
							c="gray"
						>
							{formatDate(party.updatedAt)}
						</Text>
					</Group>
				</Flex>
			</Stack>
		</Card>
	);
}

export default PartyCard;
