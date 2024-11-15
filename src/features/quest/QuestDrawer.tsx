import { Box, Drawer, Group, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useParams, useSearchParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import ViewQuest from "./ViewQuest";
import useDrawerTypeHandler from "../../hooks/useDrawerData";
import UpsertQuestForm from "./UpsertQuestForm";
import QuestOptions from "./QuestOptions";
import { Edit, Trash2 } from "lucide-react";

export type QuestDrawerType = "create" | "edit" | "view";

function QuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { partyId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const questId = searchParams.get("questId");
	const { quest, deleteQuest, getQuest, setQuest } = useQuestStore();
	const { setDrawer, drawerTitle, drawerViewType } = useDrawerTypeHandler({
		defaultTitle: "Create Quest",
		defaultView: "create",
	});

	const [isDrawerOpen, setIsDrawerOpen] = useState(isOpened);

	console.log(quest);

	const fetchQuest = async () => {
		if (partyId && questId) {
			const fetchedQuest = await getQuest(partyId, questId);
			if (fetchedQuest) {
				setDrawer("view", fetchedQuest.title);
				setQuest(fetchedQuest);
			} else {
				setDrawer("create", "Create Quest");
			}
			setIsDrawerOpen(true);
		}
	};

	useEffect(() => {
		if (quest) {
			setDrawer("view", quest.title);
			setIsDrawerOpen(true);
		} else if (questId) {
			fetchQuest();
		} else {
			setIsDrawerOpen(isOpened);
		}
	}, [quest, questId, partyId, isOpened]);

  const handleClose = () => {
		setDrawer("create", "Create Quest");
		setQuest(null);
		setIsDrawerOpen(false);

		const newParams = new URLSearchParams(searchParams);
		newParams.delete("questId");
		setSearchParams(newParams);

		onClose();
	};

	const handleEdit = () => {
		if (quest) {
			setDrawer(
				drawerViewType === "edit" ? "view" : "edit",
				`Editing: ${quest.title}`,
			);
		}
	};

	const handleDelete = async () => {
		if (partyId && questId) {
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
			opened={isDrawerOpen}
			onClose={handleClose}
			position="right"
		>
			<Box
				px={32}
				h="100%"
			>
				<Group justify="space-between">
					<Title size="2rem">{drawerTitle}</Title>
					{(drawerViewType === "edit" || drawerViewType === "view") &&
						quest && <QuestOptions options={questOptions} />}
				</Group>
				{drawerViewType === "view" && <ViewQuest />}
				{drawerViewType === "edit" && quest && (
					<UpsertQuestForm
						onClose={onClose}
						quest={quest}
					/>
				)}
				{drawerViewType === "create" && <UpsertQuestForm onClose={onClose} />}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
