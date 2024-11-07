import { Box, Drawer, Group, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { Quest } from "../../shared/types/quest.types";
import ViewQuest from "./ViewQuest";
import useDrawerTypeHandler from "../../hooks/useDrawerData";
import UpsertQuestForm from "./UpsertQuestForm";
import QuestOptions from "./QuestOptions";
import { Edit, Trash2 } from "lucide-react";

export type QuestDrawerType = "create" | "edit" | "view";

function QuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { partyId, questId } = useParams();
	const { getQuest, deleteQuest } = useQuestStore();
	const [quest, setQuest] = useState<Quest | null>();
	const { setDrawer, drawerTitle, drawerViewType } = useDrawerTypeHandler({
		defaultTitle: "Create Quest",
		defaultView: "create",
	});
	const navigate = useNavigate();

	const fetchQuest = async () => {
		if (partyId && questId) {
			const fetchedQuest = await getQuest(partyId, questId);

			if (fetchedQuest) {
				setQuest(fetchedQuest);
				setDrawer("view", fetchedQuest.title);
			} else {
				setDrawer("create", "Create Quest");
			}
		}
	};

	useEffect(() => {
		if (questId) {
			fetchQuest();
		}
	}, [partyId, questId]);

	const handleClose = () => {
		setDrawer("create", "Create Quest");
		setQuest(null);
		navigate(`/parties/${partyId}/quests`);
		onClose();
	};

	const handleEdit = () => {
		if (quest) {
			if (drawerViewType === "edit") {
				setDrawer("view", quest.title);
			} else {
				setDrawer("edit", `Editing: ${quest.title}`);
			}
		}
	};

	const handleDelete = async () => {
		if (partyId && questId) {
			console.log("DELETING");
			deleteQuest(partyId, questId);
			handleClose();
		}
	};

	const questOptions = [
		{
			icon: <Edit size={16} />,
			text: "Edit",
			onClick: handleEdit,
		},
		{
			icon: <Trash2 size={16} />,
			text: "Delete",
			onClick: handleDelete,
		},
	];

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
				<Group justify="space-between">
					<Title size="2rem">{drawerTitle}</Title>
					{((drawerViewType === "edit" && quest) ||
						drawerViewType === "view") &&
					quest ? (
						// <ToggleEdit
						// 	toggle={handleEdit}
						// 	isEditing={drawerViewType === "edit"}
						// />
						<QuestOptions options={questOptions} />
					) : null}
				</Group>
				{drawerViewType === "view" ? <ViewQuest /> : null}
				{drawerViewType === "edit" && quest ? (
					<UpsertQuestForm
						onClose={onClose}
						quest={quest}
					/>
				) : null}{" "}
				{drawerViewType === "create" ? (
					<UpsertQuestForm onClose={onClose} />
				) : null}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
