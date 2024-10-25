import { Group, Tabs } from "@mantine/core";
import { LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import QuestCard from "../quest/QuestCard";
import { Quest } from "../../shared/types/quest.types";
import { useParams } from "react-router-dom";
import useCampaignStore from "../../stores/useCampaignStore";

type CampaignTabsProps = {
	quests: Quest[];
	onOpenQuestHandler: () => void;
};

function CampaignTabs({ quests, onOpenQuestHandler }: CampaignTabsProps) {
	const { campaignId } = useParams();



	return (
		<Tabs
			defaultValue="grid"
			color="violet"
		>
			<Tabs.List
				bg="secondary"
				justify="space-between"
			>
				<Group>
					<Tabs.Tab
						value="grid"
						px={40}
						leftSection={<LayoutGrid size={20} />}
					>
						Grid
					</Tabs.Tab>
					<Tabs.Tab
						value="list"
						px={40}
						leftSection={<LayoutList size={20} />}
					>
						List
					</Tabs.Tab>
				</Group>
			</Tabs.List>

			<Tabs.Panel
				value="grid"
				p={16}
			>
				<SimpleGridLayout cols={6}>
					{quests.map((quest) => (
						<QuestCard
							key={quest.id}
							quest={quest}
							onClick={onOpenQuestHandler}
						/>
					))}
				</SimpleGridLayout>
			</Tabs.Panel>
			<Tabs.Panel value="list">List Tab View</Tabs.Panel>
		</Tabs>
	);
}

export default CampaignTabs;
