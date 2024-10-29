import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";

type QuestMode = "view" | "create";

function useQuestDrawer() {
	const { questId } = useParams();
	const [questMode, setQuestMode] = useState<QuestMode>("view");

	const [
		openedInviteMember,
		{ open: openMemberInvite, close: closeMemberInvite },
	] = useDisclosure(false);
	const [openedQuest, { open: openQuest, close: closeQuest }] =
		useDisclosure(false);

	const handleNewQuest = () => {
		setQuestMode("create");
		openQuest();
	};

	const handleViewQuest = () => {
		setQuestMode("view");
		openQuest();
	};

	useEffect(() => {
		if (questId) {
			openQuest();
		}
	}, [questId, openQuest]);

	return {
		questMode,
		setQuestMode,
		openedInviteMember,
		openMemberInvite,
		closeMemberInvite,
		openedQuest,
		openQuest,
		closeQuest,
		handleNewQuest,
		handleViewQuest,
	};
}

export default useQuestDrawer;
