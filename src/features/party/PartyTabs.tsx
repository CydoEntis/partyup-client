import { Box, Flex, Group, Pagination, ScrollArea, Skeleton, Stack, Tabs, TextInput } from "@mantine/core";
import { LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import QuestCard from "../quest/QuestCard";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import { useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useEffect, useState } from "react";

function PartyTabs() {
	const { partyId } = useParams();
	const {
		getQuests,
		paginatedQuests,
		loading: { list },
	} = useQuestStore();
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchQuests = async () => {
			if (partyId) {
				try {
					const params = {
						pageNumber: page, 
					};
					await getQuests(partyId, params);
				} catch (error) {
					console.error("Error fetching party or quests:", error);
				}
			}
		};

		fetchQuests();
	}, [partyId, getQuests, page]); 

	const handlePageChange = (newPage: number) => {
		setPage(newPage); 
	};

	const { handleViewQuest } = useQuestDrawer();

	return (
		<Tabs
			defaultValue="grid"
			color="violet"
		>
			<Tabs.List
				bg="secondary"
				justify="space-between"
				w="100%"
			>
				<Flex
					justify="space-between"
					w="100%"
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
					<Group >
							<TextInput />
					</Group>
				</Flex>
			</Tabs.List>

			<Tabs.Panel
				value="grid"
				p={16}
			>
				<Stack
					justify="space-between"
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
								: paginatedQuests?.items.map((quest) => (
										<QuestCard
											key={quest.id}
											quest={quest}
											onClick={handleViewQuest}
										/>
								  ))}
						</SimpleGridLayout>
					<Flex justify="center">
						<Pagination
							total={paginatedQuests?.totalPages || 1}
							value={page}
							onChange={handlePageChange}
							color="violet"
						/>
					</Flex>
				</Stack>
			</Tabs.Panel>
			<Tabs.Panel value="list">List Tab View</Tabs.Panel>
		</Tabs>
	);
}

export default PartyTabs;
