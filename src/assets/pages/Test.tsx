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

	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title="Authentication"
				position="right"
			>
				This bitch open
			</Drawer>

			<Container
				fluid
				h="100vh"
			>
				<SimpleGrid cols={6}>
					{Array.from({ length: 10 }).map((_, index) => (
						<QuestCard index={index} onClick={open}/>
					))}
				</SimpleGrid>
			</Container>
		</>
	);
}

export default Test;
