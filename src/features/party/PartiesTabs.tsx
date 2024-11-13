import { Group, Skeleton, Tabs } from "@mantine/core";
import { LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import { useEffect } from "react";
import usePartiestore from "../../stores/usePartyStore";
import PartyCard from "./PartyCard";

function PartiesTabs() {
	const {
		getParties,
		parties,
		loading: { list },
	} = usePartiestore();

	useEffect(() => {
		const fetchQuests = async () => {
			try {
				await getParties();
			} catch (error) {
				console.error("Error fetching party or quests:", error);
			}
		};

		fetchQuests();
	}, [getParties]);

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
					{list
						? Array.from({ length: 12 }).map((_, index) => (
								<Skeleton
									key={index}
									height={350}
									mb="md"
								/>
						  ))
						: parties &&
						  parties.items.map((party) => (
								<PartyCard
									key={party.id}
									party={party}
								/>
						  ))}
				</SimpleGridLayout>
			</Tabs.Panel>
			<Tabs.Panel value="list">List Tab View</Tabs.Panel>
		</Tabs>
	);
}

export default PartiesTabs;
