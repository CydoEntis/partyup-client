import { Group, Tabs } from "@mantine/core";
import React from "react";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import { LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import QuestCard from "../quest/QuestCard";

type Props = {};

function CampaignTabs({}: Props) {
	const { isLightMode } = useGetColorTheme();
	return (
		<Tabs
			defaultValue="grid"
			color="violet"
		>
			<Tabs.List
				bg={isLightMode ? "lightMode.7" : "darkMode.8"}
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
					{Array.from({ length: 8 }).map((_, index) => (
						<QuestCard
							index={index}
							onClick={() => console.log("Clicked")}
						/>
					))}
				</SimpleGridLayout>
			</Tabs.Panel>
			<Tabs.Panel value="list">List Tab View</Tabs.Panel>
		</Tabs>
	);
}

export default CampaignTabs;
