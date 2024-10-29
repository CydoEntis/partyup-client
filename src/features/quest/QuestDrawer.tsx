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
import useDrawerData from "../../hooks/useDrawerData";
import ToggleEdit from "../../components/toggle/ToggleEdit";

function QuestDrawer({ isOpened, onClose }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getQuest } = useQuestStore();
	const [quest, setQuest] = useState<Quest | null>();
	const { setDrawerState, viewType, drawerTitle } = useDrawerData();
	const navigate = useNavigate();

	const fetchQuest = async () => {
		if (campaignId && questId) {
			const fetchedQuest = await getQuest(campaignId, questId);

			if (fetchedQuest) {
				setQuest(fetchedQuest);
				setDrawerState("view", fetchedQuest.name);
			}
		}
	};

	useEffect(() => {
		if (questId) {
			fetchQuest();
		}
	}, [campaignId, questId]);

	const handleClose = () => {
		setDrawerState("create", "Create a Quest");
		setQuest(null);
		navigate(`/campaigns/${campaignId}/quests`);
		onClose();
	};

	const handleEdit = (title: string) => {
		if (viewType === "edit") {
			setDrawerState("view", title);
		} else {
			setDrawerState("edit", title);
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
					{((viewType === "edit" && quest) || viewType === "view") && quest ? (
						<ToggleEdit
							toggle={() => handleEdit(quest.name)}
							isEditing={viewType === "edit"}
						/>
					) : null}
				</Group>
				{viewType === "view" && quest ? <ViewQuest quest={quest} /> : null}
				{viewType === "edit" && quest ? <EditQuest /> : null}{" "}
				{viewType === "create" ? <CreateQuest /> : null}
			</Box>
		</Drawer>
	);
}

export default QuestDrawer;
