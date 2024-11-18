import { ActionIcon, Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import PageHeader from "../../../components/header/PageHeader";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";

import { useDisclosure } from "@mantine/hooks";
import FilterModal from "../../filters/FilterModal";
import { useRef } from "react";
import { Settings2 } from "lucide-react";
import usePartyQueryUpdater from "../../../hooks/usePartyQueryUpdater";
import {
	dateOptions,
	orderOptions,
	sortOptions,
} from "../../../shared/options/party-filter.options";
import useQueryUpdater from "../../../hooks/usePartyQueryUpdater";
import usePartyStore from "../../../stores/usePartyStore";

function PartyListHeader() {
	const {getParties} = usePartyStore();

	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const { handleSearch, clearSearchParam, applyFilters, clearAllFilterParams } =
		useQueryUpdater({ fetchCallback: getParties });

	const callbacksRef = useRef<Record<string, () => void>>({});

	const [isFilterOpened, { open: openFilters, close: closeFilters }] =
		useDisclosure(false);

	const handleSearchSubmit = () => {
		handleSearch(form.values.search);
	};

	const handleApplyFilters = (filters: Record<string, any>) => {
		applyFilters(filters);
		closeFilters();
	};

	const handleClearFilters = () => {
		clearAllFilterParams();
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
						onClear={clearSearchParam}
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
