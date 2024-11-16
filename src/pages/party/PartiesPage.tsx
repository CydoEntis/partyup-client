import {
	ActionIcon,
	Box,
	Flex,
	Group,
	Pagination,
	Skeleton,
	Tooltip,
} from "@mantine/core";
import PageHeader from "../../components/header/PageHeader";
import QuestSearchBar from "../../features/quest/QuestSearchBar";
import { LayoutGrid, LayoutList } from "lucide-react";
import PageFooter from "../../components/footer/PageFooter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import PartyCard from "../../features/party/PartyCard";
import PartyGridView from "../../features/party/PartyGridView";
import LayoutOptions from "../../components/layout/LayoutOptions";

type Props = {};

function PartiesPage({}: Props) {
	const {
		getParties,
		parties,
		loading: { list },
	} = usePartyStore();
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

	return (
		<Box>
			<PageHeader title="Joined Parties">
				<Flex
					align="end"
					justify="space-between"
				>
					<QuestSearchBar />
					<LayoutOptions />
				</Flex>
			</PageHeader>
			<Box p={32}>
				{parties ? (
					<PartyGridView
						loading={list}
						parties={parties?.items}
					/>
				) : null}
			</Box>
			<PageFooter>
				<>
					{parties && parties.totalPages > 1 ? (
						<Pagination
							total={parties?.totalPages || 1}
							value={page}
							onChange={handlePageChange}
							color="violet"
						/>
					) : null}
				</>
			</PageFooter>
		</Box>
	);
}

export default PartiesPage;
