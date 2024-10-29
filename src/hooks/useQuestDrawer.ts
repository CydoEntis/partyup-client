import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";

type QuestViewType = "view" | "create";

function useQuestDrawer() {
	const { questId } = useParams();
	const [questViewType, setQuestViewType] = useState<QuestViewType>("view");

	const [openedQuest, { open: openQuest, close: closeQuest }] =
		useDisclosure(false);

	const handleNewQuest = () => {
		setQuestViewType("create");
		openQuest();
	};

	const handleViewQuest = () => {
		setQuestViewType("view");
		openQuest();
	};

	useEffect(() => {
		if (questId) {
			openQuest();
		}
	}, [questId, openQuest]);

	return {
		questViewType,
		setQuestViewType,
		openedQuest,
		openQuest,
		closeQuest,
		handleNewQuest,
		handleViewQuest,
	};
}

export default useQuestDrawer;
