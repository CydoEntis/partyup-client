import { Box, Button, Stack, Title } from "@mantine/core";
import { Quest } from "../../../shared/types/quest.types";
import { GridType } from "../../../shared/types/auth.types";
import QuestGridView from "../views/QuestGridView";
import QuestListView from "../views/QuestListView";
import { PlusCircle } from "lucide-react";

type QuestListBodyProps = {
	quests: Quest[];
	layout: GridType;
	loading: boolean;
	handleViewQuest: () => void;
	handleCreateQuest: () => void;
};

function QuestListBody({
	quests,
	layout,
	loading,
	handleViewQuest,
	handleCreateQuest,
}: QuestListBodyProps) {
	if (quests.length === 0 && !loading)
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
						onClick={handleCreateQuest}
					>
						Create Party
					</Button>
				</Stack>
			</Box>
		);

	return (
		<Box p={32}>
			{layout === "grid" ? (
				<QuestGridView
					loading={loading}
					quests={quests}
					onViewQuest={handleViewQuest}
				/>
			) : (
				<QuestListView
					quests={quests}
					loading={loading}
				/>
			)}
		</Box>
	);
}

export default QuestListBody;
