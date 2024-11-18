import { ActionIcon, Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import PageHeader from "../../../components/header/PageHeader";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";

import { useDisclosure } from "@mantine/hooks";
import FilterModal from "../../filters/FilterModal";
import { useRef, useEffect } from "react";
import { Settings2 } from "lucide-react";
import {
	dateOptions,
	orderOptions,
	sortOptions,
} from "../../../shared/options/party-filter.options";
import useQueryUpdater from "../../../hooks/usePartyQueryUpdater";
import usePartyStore from "../../../stores/usePartyStore";
import { useLocation } from "react-router-dom";

function PartyListHeader() {
	const { getParties } = usePartyStore();
	const location = useLocation();

	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const {
		handleSearch,
		resetSearchAndFetch,
		applyFilters,
		resetFiltersAndFetch,
	} = useQueryUpdater({ fetchCallback: getParties });

	const callbacksRef = useRef<Record<string, () => void>>({});

	const [isFilterOpened, { open: openFilters, close: closeFilters }] =
		useDisclosure(false);

	const parseQueryParams = () => {
		const searchParams = new URLSearchParams(location.search);

		const searchQuery = searchParams.get("search");
		if (searchQuery) {
			form.setFieldValue("search", searchQuery);
			handleSearch(searchQuery);
		}

		const filters = {
			sortBy: searchParams.get("sortBy") || "title",
			filterDate: searchParams.get("filterDate") || "created-at",
			priority: searchParams.get("priority") || "",
			startDate: searchParams.get("startDate") || "",
			endDate: searchParams.get("endDate") || "",
			orderBy: searchParams.get("orderBy") || "desc",
		};

		applyFilters(filters);
	};

	useEffect(() => {
		parseQueryParams();
	}, [location.search]);

	const handleSearchSubmit = () => {
		handleSearch(form.values.search);
	};

	const handleApplyFilters = (filters: Record<string, any>) => {
		applyFilters(filters);
		closeFilters();
	};

	const handleClearFilters = () => {
		resetFiltersAndFetch();
		closeFilters();
	};

	return (
		<>
			<FilterModal
				filterOpened={isFilterOpened}
				sortOptions={sortOptions}
				dateOptions={dateOptions}
				orderOptions={orderOptions}
				handleCloseFilterModal={closeFilters}
				onApplyFilters={handleApplyFilters}
				onClearFilters={handleClearFilters}
			/>
			<PageHeader title="Joined Parties">
				<Flex
					align="end"
					justify="space-between"
				>
					<SearchBar
						form={form}
						onSearch={handleSearchSubmit}
						onClear={resetSearchAndFetch}
						resetCallback={(reset) => {
							callbacksRef.current.search = reset;
						}}
					/>
					<Group align="end">
						<ActionIcon
							size="lg"
							variant="light"
							color="violet"
							onClick={openFilters}
						>
							<Settings2 size={20} />
						</ActionIcon>
						<LayoutOptions />
					</Group>
				</Flex>
			</PageHeader>
		</>
	);
}

export default PartyListHeader;
