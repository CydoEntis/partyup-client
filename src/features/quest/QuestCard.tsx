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
	Drawer,
} from "@mantine/core";

import { Calendar, ListChecks, MessageCircle } from "lucide-react";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import { useDisclosure } from "@mantine/hooks";
import Members from "../../components/avatar/Members";

type QuestCardProps = {
	index: number;
	onClick: () => void;
};

function QuestCard({ index, onClick }: QuestCardProps) {
	const { isLightMode } = useGetColorTheme();

	return (
		<>

			<Card
				key={index}
				className="transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
				bg={isLightMode ? "lightMode.7" : "darkMode.7"}
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				onClick={onClick}
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
						Norway Fjord Adventures
					</Title>
					<Text
						size="sm"
						c="dimmed"
					>
						With Fjord Tours you can explore more of the magical fjord
						landscapes with tours and activities on and around the fjords of
						Norway
					</Text>

					<Flex
						align="center"
						gap={8}
					>
						<Calendar size={20} />
						<Text>Nov 22</Text>
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
						value={66}
						striped
						animated
					/>
					<ListChecks size={20} />
					<Text>2/3</Text>
				</Flex>

				<Group
					justify="space-between"
					pt={8}
				>
					<Members
						members={[
							{ name: "Gandalf", avatar: 1 },
							{ name: "Bilbo Baggins", avatar: 2 },
						]}
						totalMembers={3}
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
