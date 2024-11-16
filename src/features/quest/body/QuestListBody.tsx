import { Box } from "@mantine/core";
import { Quest } from "../../../shared/types/quest.types";
import { GridType } from "../../../shared/types/auth.types";
import QuestGridView from "../views/QuestGridView";
import QuestListView from "../views/QuestListView";

type QuestListBodyProps = {
	quests: Quest[];
	layout: GridType;
	loading: boolean;
	handleViewQuest: () => void;
};

function QuestListBody({
	quests,
	layout,
	loading,
	handleViewQuest,
}: QuestListBodyProps) {
	return (
		<Box p={32}>
			{quests ? (
				layout === "grid" ? (
					<QuestGridView
						loading={loading}
						quests={quests}
						onViewQuest={handleViewQuest}
					/>
				) : (
					<QuestListView quests={quests} />
				)
			) : (
				<p>Loading...</p>
			)}
		</Box>
	);
}

export default QuestListBody;
