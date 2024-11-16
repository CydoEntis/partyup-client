import PartyGridView from "../PartyGridView";
import PartyListView from "../PartyListView";
import { Box } from "@mantine/core";
import { Party } from "../../../shared/types/party.types";
import { GridType } from "../../../shared/types/auth.types";

type PartyListBodyProps = {
	parties: Party[];
	layout: GridType;
	loading: boolean
};

function PartyListBody({parties, layout, loading}: PartyListBodyProps) {
	return (
		<Box p={32}>
			{parties ? (
				layout === "grid" ? (
					<PartyGridView
						loading={loading}
						parties={parties}
					/>
				) : (
					<PartyListView parties={parties} />
				)
			) : (
				<p>Loading...</p>
			)}
		</Box>
	);
}

export default PartyListBody;
