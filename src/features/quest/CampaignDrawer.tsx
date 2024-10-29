import { Drawer, Box, Group, Title, ActionIcon } from "@mantine/core";
import { Edit, X } from "lucide-react";
import useDrawerData from "../../hooks/useDrawerData";
import { DrawerProps } from "../../shared/types/drawer.types";
import EditQuest from "./EditQuest";
import UpsertCampaignForm from "../campaign/UpsertCampaignDrawer";

function CampaignDrawer({
	isOpened,
	onClose,
	viewType = "create",
}: DrawerProps) {
	const {
		drawerTitle,
		selectedViewType,
		handleClose,
		handleCreate,
		handleEdit,
	} = useDrawerData({
		isOpened,
		viewType,
		onClose,
	});

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
					{viewType === "edit" ? (
						<ActionIcon onClick={handleEdit}>
							<X />
						</ActionIcon>
					) : null}
					{viewType === "view" ? (
						<ActionIcon onClick={handleCreate}>
							<Edit />
						</ActionIcon>
					) : null}
				</Group>
				{/* Render content based on selected view type */}
				{selectedViewType === "edit" && <EditQuest />}
				{selectedViewType === "create" && <UpsertCampaignForm />}
			</Box>
		</Drawer>
	);
}

export default CampaignDrawer;
