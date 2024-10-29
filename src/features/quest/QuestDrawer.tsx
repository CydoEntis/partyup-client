import { Box, Drawer, Group, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";
import { Quest } from "../../shared/types/quest.types";
import ViewQuest from "./ViewQuest";
import EditQuest from "./EditQuest";
import CreateQuest from "./CreateQuest";
import { Edit, X } from "lucide-react";
import ToggleEdit from "../../components/toggle/ToggleEdit";
import useDrawerTypeHandler from "../../hooks/useDrawerData";

export type QuestDrawerType = "create" | "edit" | "view";

function QuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getQuest } = useQuestStore();
	const [quest, setQuest] = useState<Quest | null>();
	const { setDrawer, drawerTitle, drawerViewType } = useDrawerTypeHandler({
		defaultTitle: "Create Quest",
		defaultView: "create",
	});
	// const [drawerMode, setDrawerMode] = useState<QuestDrawerType>("create");
	// const [drawerTitle, setDrawerTitle] = useState<string>("Create Quest");
	const navigate = useNavigate();

	const fetchQuest = async () => {
		if (campaignId && questId) {
			const fetchedQuest = await getQuest(campaignId, questId);

			if (fetchedQuest) {
				setQuest(fetchedQuest);
				setDrawer("view", fetchedQuest.name);
			} else {
				setDrawer("create", "Create Quest");
			}
		}
	};

	useEffect(() => {
		if (questId) {
			fetchQuest();
		}
	}, [campaignId, questId]);

	const handleClose = () => {
		setDrawer("create", "Create Quest");
		setQuest(null);
		navigate(`/campaigns/${campaignId}/quests`);
		onClose();
	};

	const handleEdit = () => {
		if (quest) {
			if (drawerViewType === "edit") {
				setDrawer("view", quest.name);
			} else {
				setDrawer("edit", `Edit: ${quest.name}`);
			}
		}
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
					{((drawerViewType === "edit" && quest) ||
						drawerViewType === "view") &&
					quest ? (
						<ToggleEdit
							toggle={handleEdit}
							isEditing={drawerViewType === "edit"}
						/>
					) : null}
				</Group>
				{drawerViewType === "view" && quest ? (
					<ViewQuest quest={quest} />
				) : null}
				{drawerViewType === "edit" && quest ? <EditQuest /> : null}{" "}
				{drawerViewType === "create" ? <CreateQuest /> : null}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
