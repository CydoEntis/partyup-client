import {
	Badge,
	Card,
	Center,
	Container,
	Drawer,
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
import { Link } from "react-router-dom";
import QuestCard from "../../features/quest/QuestCard";
import { useDisclosure } from "@mantine/hooks";

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
		<>
			<SimpleGrid cols={6}>
				<Card bg={isLightMode ? "lightMode.7" : "darkMode.7"} withBorder>
					<Card.Section
						className="border-b border-gray-400"
						p={16}
					>
						<Title size="xl">Some - Branding</Title>
					</Card.Section>

					<Group>
						<Text>HELLO WORLD</Text>
						<Text>HELLO WORLD</Text>
						<Text>HELLO WORLD</Text>
						<Text>HELLO WORLD</Text>
					</Group>
				</Card>
			</SimpleGrid>
		</>
	);
}

export default Test;
