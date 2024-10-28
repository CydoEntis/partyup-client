import { ActionIcon, Box, Drawer, Flex, Group, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { Quest } from "../../shared/types/quest.types";
import ViewQuest from "./ViewQuest";
import EditQuest from "./EditQuest";
import CreateQuest from "./CreateQuest";
import { Edit, X } from "lucide-react";

function QuestDrawer({ isOpened, onClose, mode = "view" }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getQuest } = useQuestStore();
	const navigate = useNavigate();
	const [quest, setQuest] = useState<Quest | null>(null);
	const [content, setContent] = useState(mode); // Initialize content with mode
	const [drawerTitle, setDrawerTitle] = useState("");

	useEffect(() => {
		const fetchQuest = async () => {
			if (campaignId && questId) {
				const questData = await getQuest(Number(campaignId), Number(questId));
				setQuest(questData);
			}
		};

		if (isOpened) {
			fetchQuest();
			setContent(mode); // Set content based on mode
		} else {
			setQuest(null);
			setContent("view");
		}
	}, [isOpened, campaignId, questId, getQuest, mode]);

	useEffect(() => {
		if (mode === "create") {
			setDrawerTitle("Create New Quest");
		} else if (quest) {
			setDrawerTitle(quest.name);
		}
	}, [quest, mode]);

	const handleClose = () => {
		navigate(`/campaigns/${campaignId}/quests`);
		onClose();
	};

	const handleEditQuest = () => {
		setContent((prev) => (prev === "edit" ? "view" : "edit")); // Toggle content
	};

	return (
		<Drawer
			size="xl"
			opened={isOpened}
			onClose={handleClose}
			position="right"
		>
			<Box
				px={32}
				h="100%"
			>
				<Group>
					<Title size="2rem">{drawerTitle}</Title>
					{content === "edit" || content === "view" ? (
						<ActionIcon onClick={handleEditQuest}>
							{content === "edit" ? <X /> : <Edit />}
						</ActionIcon>
					) : null}
				</Group>
				{content === "view" && quest ? <ViewQuest quest={quest} /> : null}
				{content === "edit" && quest ? <EditQuest /> : null}{" "}
				{content === "create" ? <CreateQuest /> : null}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
