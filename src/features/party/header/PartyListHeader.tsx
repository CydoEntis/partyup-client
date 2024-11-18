import { Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import PageHeader from "../../../components/header/PageHeader";
import DateRangePicker from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import Filter from "../../../components/input/Filter";
import ClearParams from "../../../components/input/ClearParams";
import { useRef } from "react";
import {
	dateOptions,
	sortOptions,
} from "../../../shared/options/party-filter.options";
import usePartyQueryUpdater from "../../../hooks/usePartyQueryUpdater";

function PartyListHeader() {
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const {
		clearAllParams,
		handleSearch,
		handleSort,
		handleDateFilter,
		handleOrder,
		handleDateRange,
	} = usePartyQueryUpdater();

	const callbacksRef = useRef<Record<string, () => void>>({});

	const clearAllFilters = () => {
		Object.values(callbacksRef.current).forEach((reset) => reset());
		clearAllParams();
	};

	return (
		<PageHeader title="Joined Parties">
			<Flex
				align="end"
				justify="space-between"
			>
				<Group align="end">
					<SearchBar
						form={form}
						onSearch={handleSearch}
						resetCallback={(reset) => {
							callbacksRef.current.search = reset;
						}}
					/>
					<Filter
						sortOptions={sortOptions}
						dateOptions={dateOptions}
						handleSorting={handleSort}
						handleDateFiltering={handleDateFilter}
						resetCallback={(reset) => {
							callbacksRef.current.filter = reset;
						}}
					/>
					<DateRangePicker
						onDateChange={handleDateRange}
						resetCallback={(reset) => {
							callbacksRef.current.dateRange = reset;
						}}
					/>
					<OrderSwitch onOrderBy={handleOrder} />
					<ClearParams onClear={clearAllFilters} />
				</Group>
				<LayoutOptions />
			</Flex>
		</PageHeader>
	);
}

export default PartyListHeader;
