import { Box, Flex, Pagination } from "@mantine/core";
import PageHeader from "../../components/header/PageHeader";
import QuestSearchBar from "../../features/quest/QuestSearchBar";
import PageFooter from "../../components/footer/PageFooter";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";
import PartyGridView from "../../features/party/PartyGridView";
import LayoutOptions from "../../components/layout/LayoutOptions";
import PartyListView from "../../features/party/PartyListView";
import useUserStore from "../../stores/useUserStore";
import { GridType } from "../../shared/types/auth.types";
import SearchBar from "../../components/input/SearchBar";
import Filter from "../../components/input/Filter";
import DateRangePicker from "../../components/input/DateRangePicker";
import OrderSwitch from "../../components/input/OrderSwitch";
import PartyListHeader from "../../features/party/header/PartyListHeader";
import PartyListBody from "../../features/party/body/PartyListBody";
import PartyListFooter from "../../features/party/footer/PartyListFooter";

function PartiesPage() {
	const { layout } = useUserStore();
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		getParties,
		parties,
		loading: { list: loadingList },
	} = usePartyStore();
	
	const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	useEffect(() => {
		const fetchParties = async () => {
			try {
				const params = { pageNumber: page };
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

	return (
		<Box>
			<PartyListHeader />
			{parties && (
				<>
					<PartyListBody
						parties={parties.items}
						loading={loadingList}
						layout={layout}
					/>
					<PartyListFooter totalPages={parties.totalPages} onPageChange={handlePageChange} page={page} />
				</>
			)}
		</Box>
	);
}

export default PartiesPage;
