import { SimpleGrid, Skeleton } from "@mantine/core";
import QuestCard from "../QuestCard";
import { Quest } from "../../../shared/types/quest.types";

type PartyGridViewProps = {
	loading: boolean;
	quests: Quest[];
	onViewQuest: () => void;
};

function PartyGridView({ loading, quests, onViewQuest }: PartyGridViewProps) {
	return (
		<SimpleGrid cols={6}>
			{loading
				? Array.from({ length: 12 }).map((_, index) => (
						<Skeleton
							key={index}
							height={350}
							mb="md"
						/>
				  ))
				: quests &&
				  quests.map((quest) => (
						<QuestCard
							key={quest.id}
							quest={quest}
							onClick={onViewQuest}
						/>
				  ))}
		</SimpleGrid>
	);
}

export default PartyGridView;
