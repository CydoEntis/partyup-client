import { Group, Skeleton, Tabs } from "@mantine/core";
import { LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import QuestCard from "../quest/QuestCard";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import { useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";

function CampaignTabs() {
	const { campaignId } = useParams();
	const { getQuests, paginatedQuests, loading } = useQuestStore();

	useEffect(() => {
		const fetchCampaign = async () => {
			if (campaignId) {
				try {
					await getQuests(campaignId);
				} catch (error) {
					console.error("Error fetching campaign or quests:", error);
				}
			}
		};

		fetchCampaign();
	}, [campaignId, getQuests]);

	console.log("Pg: ", paginatedQuests);

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

export default CampaignTabs;
