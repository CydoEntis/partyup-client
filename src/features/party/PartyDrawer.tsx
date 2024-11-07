import { Box, Drawer, Title } from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";

import { Party } from "../../shared/types/party.types";
import UpsertPartyForm from "./UpsertPartyForm";

type PartyDrawerProps = DrawerProps & {
	party?: Party;
	drawerMode: "create" | "edit";
};

function PartyDrawer({
	isOpened,
	onClose,
	drawerMode,
	party,
}: PartyDrawerProps) {
	return (
		<Drawer
			size="xl"
			opened={isOpened}
			onClose={onClose}
			position="right"
		>
			<Box
				px={32}
				h="100%"
			>
				<Title size="2rem">
					{drawerMode === "create"
						? "Create a Party"
						: `Editing: ${party?.title} `}
				</Title>
				<UpsertPartyForm
					party={party}
					onClose={onClose}
				/>
			</Box>
		</Drawer>
	);
}

export default PartyDrawer;
