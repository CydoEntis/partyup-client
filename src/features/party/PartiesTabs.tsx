import {
	ActionIcon,
	Box,
	Flex,
	Group,
	Pagination,
	Paper,
	ScrollArea,
	Skeleton,
	Stack,
	Table,
	Tabs,
} from "@mantine/core";
import { Eye, LayoutGrid, LayoutList } from "lucide-react";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import usePartiestore from "../../stores/usePartyStore";
import PartyCard from "./PartyCard";
import Members from "../../components/avatar/Members";
import { formatDate } from "../../shared/utils/date.utils";

function PartiesTabs() {
	const {
		getParties,
		parties,
		loading: { list },
	} = usePartiestore();
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

	useEffect(() => {
		const fetchParties = async () => {
			try {
				const params = {
					pageNumber: page,
				};
				await getParties(params);
			} catch (error) {
				console.error("Error fetching party or quests:", error);
			}
		};

		fetchParties();
	}, [getParties, page]);

	useEffect(() => {
		setSearchParams({ page: page.toString() });
	}, [page, setSearchParams]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	if (!parties) return <p>Loading...</p>;

	const rows = parties.items.map((party) => (
		<Table.Tr key={party.id}>
			<Table.Td>{party.title}</Table.Td>
			<Table.Td>{party.description}</Table.Td>
			<Table.Td>
				<Members
					members={party.members}
					numOfMembersToShow={3}
				/>
			</Table.Td>
			<Table.Td>{formatDate(party.dueDate)}</Table.Td>
			<Table.Td>
				<ActionIcon
					variant="light"
					color="violet"
					component={NavLink}
					to={`/parties/${party.id}/quests`}
				>
					<Eye size={20} />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));

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
				<Stack
					justify="space-between"
					h="75vh"
				>
					<ScrollArea>
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
					</ScrollArea>
					<Flex justify="center">
						<Pagination
							total={parties?.totalPages || 1}
							value={page}
							onChange={handlePageChange}
							color="violet"
						/>
					</Flex>
				</Stack>
			</Tabs.Panel>
			<Tabs.Panel value="list">
				<Box p={32}>
					<Paper
						withBorder
						p={16}
					>
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Title</Table.Th>
									<Table.Th>Description</Table.Th>
									<Table.Th>Members</Table.Th>
									<Table.Th>Due Date</Table.Th>
									<Table.Th></Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{rows}</Table.Tbody>
						</Table>
					</Paper>
				</Box>
			</Tabs.Panel>
		</Tabs>
	);
}

export default PartiesTabs;
