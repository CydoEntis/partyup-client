import { Group, Skeleton, Tabs } from "@mantine/core";
import { LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import QuestCard from "../quest/QuestCard";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import { useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect } from "react";

function PartyTabs() {
	const { partyId } = useParams();
	const { getQuests, paginatedQuests, loading } = useQuestStore();

	useEffect(() => {
		const fetchParty = async () => {
			if (partyId) {
				try {
					await getQuests(partyId);
				} catch (error) {
					console.error("Error fetching party or quests:", error);
				}
			}
		};

		fetchParty();
	}, [partyId, getQuests]);

	const { handleViewQuest } = useQuestDrawer();

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
					{loading
						? Array.from({ length: 12 }).map((_, index) => (
								<Skeleton
									key={index}
									height={350}
									mb="md"
								/>
						  ))
						: paginatedQuests?.items.map((quest) => (
								<QuestCard
									key={quest.id}
									quest={quest}
									onClick={handleViewQuest}
								/>
						  ))}
				</SimpleGridLayout>
			</Tabs.Panel>
			<Tabs.Panel value="list">List Tab View</Tabs.Panel>
		</Tabs>
	);
}

export default PartyTabs;