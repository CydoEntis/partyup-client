import { ActionIcon, Box, Drawer, Flex, Group, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditQuest from "./EditQuest";
import { Edit, X } from "lucide-react";
import useCampaignStore from "../../stores/useCampaignStore";
import { Campaign } from "../../shared/types/campaign.types";
import UpsertCampaignForm from "../campaign/UpsertCampaignDrawer";

function CampaignDrawer({ isOpened, onClose, mode = "create" }: DrawerProps) {
	const { campaignId, questId } = useParams();
	const { getCampaign } = useCampaignStore();
	const navigate = useNavigate();
	const [drawerTitle, setDrawerTitle] = useState("");
	const [campaign, setCampaign] = useState<Campaign | null>(null);
	const [content, setContent] = useState(mode);

	useEffect(() => {
		const fetchCampaign = async () => {
			if (campaignId && questId) {
				const campaignData = await getCampaign(Number(campaignId));
				setCampaign(campaignData);
			}
		};

		if (isOpened) {
			fetchCampaign();
			setContent(mode); // Set content based on mode
		} else {
			setCampaign(null);
			setContent("view");
		}
	}, [isOpened, campaignId, questId, getCampaign, mode]);

	useEffect(() => {
		if (mode === "create") {
			setDrawerTitle("Create New Quest");
		} else if (campaign) {
			setDrawerTitle(campaign.title);
		}
	}, [campaign, mode]);

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
				{content === "edit" && campaign ? <EditQuest /> : null}{" "}
				{content === "create" ? <UpsertCampaignForm /> : null}
			</Box>
		</Drawer>
	);
}

export default CampaignDrawer;
