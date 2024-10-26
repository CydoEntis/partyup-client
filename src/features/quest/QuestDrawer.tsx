import { Box, Drawer, Flex, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { Quest } from "../../shared/types/quest.types";
import ViewQuest from "./ViewQuest";
import EditQuest from "./EditQuest";
import CreateQuest from "./CreateQuest";

function QuestDrawer({ isOpened, onClose, mode = "view" }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getQuest } = useQuestStore();
	const navigate = useNavigate();
	const [quest, setQuest] = useState<Quest | null>(null);
	const [content, setContent] = useState("");

	useEffect(() => {
		const fetchQuest = async () => {
			if (campaignId && questId) {
				const questData = await getQuest(Number(campaignId), Number(questId));
				console.log(questData);
				setQuest(questData);
			}
		};

		if (isOpened) {
			fetchQuest();
			setContent(mode);
		} else {
			setQuest(null);
			setContent("view");
		}
	}, [isOpened, campaignId, questId, getQuest, mode]);

	const handleClose = () => {
		navigate(`/campaigns/${campaignId}/quests`);
		onClose();
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
				<Title size="2rem">Placeholder</Title>
				{content === "view" && quest ? <ViewQuest quest={quest} /> : null}
				{content === "edit" ? <EditQuest /> : null}
				{content === "create" ? <CreateQuest /> : null}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
