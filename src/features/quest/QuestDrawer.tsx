import {
	Drawer,
	Flex,
	Title,
	Stack,
	Button,
	Badge,
	Text,
	Box,
} from "@mantine/core";
import CommentList from "../../components/comments/CommentList";
import TaskList from "../../components/tasks/TaskList";
import { Check, Clock, X } from "lucide-react";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { formatDate } from "../../shared/utils/date.utils";
import { Quest } from "../../shared/types/quest.types";
import ViewQuest from "./ViewQuest";

function QuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getQuest } = useQuestStore();
	const navigate = useNavigate();
	const [quest, setQuest] = useState<Quest | null>(null);
	console.log(questId);
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
		} else {
			setQuest(null);
		}
	}, [isOpened, questId, getQuest]);

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
			{quest ? <ViewQuest quest={quest} /> : null}
		</Drawer>
	);
}

export default QuestDrawer;
