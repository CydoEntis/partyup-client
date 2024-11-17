import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import usePartyStore from "../../stores/usePartyStore";
import useUserStore from "../../stores/useUserStore";
import PartyListHeader from "../../features/party/header/PartyListHeader";
import PartyListBody from "../../features/party/body/PartyListBody";
import PartyDrawer from "../../features/party/PartyDrawer";
import { useQueryParams } from "../../hooks/useQueryParams";
import PartyListFooter from "../../features/party/footer/PartyListFooter";

function PartiesPage() {
	const { layout } = useUserStore();
	const {
		getParties,
		parties,
		loading: { list: loadingList },
	} = usePartyStore();

	const { getSearchParams, updateQueryParams } = useQueryParams();
	const {
		pageNumber = 1,
		search,
		sortBy,
		filterDate,
		orderBy,
		startDate,
		endDate,
	} = getSearchParams();

	const [currentPage, setCurrentPage] = useState(pageNumber);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
		updateQueryParams({
			pageNumber: newPage,
			search,
			sortBy,
			filterDate,
			orderBy,
			startDate,
			endDate,
		});
	};

	useEffect(() => {
		const fetchParties = async () => {
			try {
				const params = {
					pageNumber: currentPage,
					search,
					sortBy,
					filterDate,
					orderBy,
					startDate,
					endDate,
				};
				await getParties(params);
			} catch (error) {
				console.error("Error fetching parties:", error);
			}
		};

		fetchParties();
	}, [getParties, currentPage, search, sortBy, filterDate, orderBy, layout]);

	const [
		createPartyOpened,
		{ open: openCreateParty, close: closeCreateParty },
	] = useDisclosure(false);

	return (
		<>
			<PartyDrawer
				isOpened={createPartyOpened}
				onClose={closeCreateParty}
				drawerMode={"create"}
			/>
			<Box
				mih="50vh"
				pos="relative"
			>
				<PartyListHeader />
				<PartyListBody
					parties={parties?.items || []}
					loading={loadingList}
					layout={layout}
					onOpen={openCreateParty}
				/>
				<PartyListFooter
					totalPages={parties?.totalPages || 1}
					onPageChange={handlePageChange}
					page={pageNumber}
				/>
			</Box>
		</>
	);
}

export default PartiesPage;
