import {
	Badge,
	Card,
	Center,
	Container,
	Flex,
	Group,
	Indicator,
	Progress,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import QuestOptions from "../../features/quest/QuestOptions";
import {
	Calendar,
	CheckCheck,
	Edit,
	ListChecks,
	MessageCircle,
	Trash2,
} from "lucide-react";
import Members from "../components/avatar/Members";

type Props = {};

function Test({}: Props) {
	const { isLightMode } = useGetColorTheme();

	const options = [
		{
			text: "Edit",
			icon: <Edit size={20} />,
			onClick: () => console.log("Clicked Edit"),
		},
		{
			text: "Delete",
			icon: <Trash2 size={20} />,
			onClick: () => console.log("Clicked Delete"),
		},
	];

	return (
		<Container fluid>
			<SimpleGrid cols={6}>
				{Array.from({ length: 10 }).map((_, index) => (
					<Card
						bg={isLightMode ? "lightMode.7" : "darkMode.7"}
						shadow="sm"
						padding="lg"
						radius="md"
						withBorder
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
							<QuestOptions options={options} />
						</Group>

						<Group>
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
				))}
			</SimpleGrid>
		</Container>
	);
}

export default Test;
