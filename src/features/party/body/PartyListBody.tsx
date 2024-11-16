import PartyGridView from "../PartyGridView";
import PartyListView from "../PartyListView";
import { Box, Button, Stack, Title } from "@mantine/core";
import { Party } from "../../../shared/types/party.types";
import { GridType } from "../../../shared/types/auth.types";
import { PlusCircle } from "lucide-react";

type PartyListBodyProps = {
	parties: Party[];
	layout: GridType;
	loading: boolean;
	onOpen: () => void;
};

function PartyListBody({
	parties,
	layout,
	loading,
	onOpen,
}: PartyListBodyProps) {
	if (parties.length === 0 && !loading)
		return (
			<Box
				pos="absolute"
				top="50%"
				left="50%"
				style={{
					transform: "translate(-50%, -50%)",
				}}
			>
				<Stack
					gap={4}
					justify="center"
					align="center"
				>
					<Title>Looks like you aren't a part of any parties</Title>
					<Button
						variant="light"
						color="violet"
						leftSection={<PlusCircle size={20} />}
						onClick={onOpen}
					>
						Create Party
					</Button>
				</Stack>
			</Box>
		);

	return (
		<Box p={32}>
			{layout === "grid" ? (
				<PartyGridView
					loading={loading}
					parties={parties}
				/>
			) : (
				<PartyListView
					parties={parties}
					loading={loading}
				/>
			)}
		</Box>
	);
}

export default PartyListBody;
