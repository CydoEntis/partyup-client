import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";
import useUserStore from "../../stores/useUserStore";
import PartyListHeader from "../../features/party/header/PartyListHeader";
import PartyListBody from "../../features/party/body/PartyListBody";
import PartyListFooter from "../../features/party/footer/PartyListFooter";
import PartyDrawer from "../../features/party/PartyDrawer";
import { useDisclosure } from "@mantine/hooks";

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
				console.error("Error fetching parties:", error);
			}
		};

		fetchParties();
	}, [getParties, page, layout]);

	useEffect(() => {
		setSearchParams({ page: page.toString() });
	}, [page, setSearchParams]);

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
				<>
					<PartyListBody
						parties={parties?.items || []}
						loading={loadingList}
						layout={layout}
						onOpen={openCreateParty}
					/>
					<PartyListFooter
						totalPages={parties?.totalPages || 1}
						onPageChange={handlePageChange}
						page={page}
					/>
				</>
			</Box>
		</>
	);
}

export default PartiesPage;
