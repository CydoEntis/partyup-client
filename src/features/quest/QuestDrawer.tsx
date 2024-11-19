import { Box, Drawer, Flex, Group, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useParams, useSearchParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import ViewQuest from "./ViewQuest";
import UpsertQuestForm from "./UpsertQuestForm";
import MenuOptions from "../../components/menu/MenuOptions";
import { Edit, Trash2 } from "lucide-react";
import { truncateText } from "../../shared/utils/text.utils";

export type QuestDrawerType = "create" | "edit" | "view";

function QuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { partyId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const questId = searchParams.get("questId");
	const { quest, deleteQuest, getQuest, setQuest } = useQuestStore();

	const [isDrawerOpen, setIsDrawerOpen] = useState(isOpened);
	const [isEditing, setIsEditing] = useState(false);

	const fetchQuest = async () => {
		if (partyId && questId) {
			const fetchedQuest = await getQuest(partyId, questId);
			if (fetchedQuest) {
				setQuest(fetchedQuest);
				setIsEditing(false);
			}
			setIsDrawerOpen(true);
		}
	};

	useEffect(() => {
		if (quest) {
			setIsDrawerOpen(true);
		} else if (questId) {
			fetchQuest();
		} else {
			setIsDrawerOpen(isOpened);
		}
	}, [quest, questId, partyId, isOpened]);

	const handleClose = () => {
		setQuest(null);
		setIsEditing(false);
		setIsDrawerOpen(false);

		const newParams = new URLSearchParams(searchParams);
		newParams.delete("questId");
		setSearchParams(newParams);

		onClose();
	};

	const handleDelete = async () => {
		if (partyId && questId) {
			deleteQuest(partyId, questId);
			handleClose();
		}
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const menuOptions = [
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
				<Flex
					justify="space-between"
					align="start"
				>
					<Box w="90%">
						<Title
							size="2rem"
							style={{
								whiteSpace: "normal",
								wordBreak: "break-word",
								overflowWrap: "break-word",
							}}
						>
							{quest ? quest.title : "Create Quest"}
						</Title>
					</Box>
					{quest &&
						(quest.currentUserRole === "Creator" ||
							quest.currentUserRole === "Maintainer") &&
						!isEditing && (
							<Box w={"5%"}>
								<MenuOptions options={menuOptions} />
							</Box>
						)}
				</Flex>
				{isEditing && quest ? (
					<UpsertQuestForm
						onClose={handleClose}
						quest={quest}
					/>
				) : quest ? (
					<ViewQuest />
				) : (
					<UpsertQuestForm onClose={handleClose} />
				)}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
