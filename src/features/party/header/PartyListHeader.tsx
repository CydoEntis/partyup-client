import { ActionIcon, Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import PageHeader from "../../../components/header/PageHeader";
import DateRangePicker from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import { useQueryParams } from "../../../hooks/useQueryParams";
import usePartyStore from "../../../stores/usePartyStore";
import Filter from "../../../components/input/Filter";
import { X } from "lucide-react";
import ClearParams from "../../../components/input/ClearParams";

function PartyListHeader() {
	const { getParties } = usePartyStore();
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const { updateQueryParams, getSearchParams, clearQueryParams } =
		useQueryParams();

	const sortOptions = [
		{ label: "Title", value: "title" },
		{ label: "Priority", value: "priority" },
	];

	const dateOptions = [
		{ label: "Created On", value: "created-at" },
		{ label: "Updated On", value: "updated-at" },
	];

	const currentParams = getSearchParams();

	const searchHandler = (search: string) => {
		updateQueryParams({ ...currentParams, search });
		getParties({ ...currentParams, search });
	};

	const sortByHandler = (sortBy: string) => {
		updateQueryParams({ ...currentParams, sortBy });
		getParties({ ...currentParams, sortBy });
	};

	const dateFilterHandler = (filterDate: string) => {
		updateQueryParams({ ...currentParams, filterDate });
		getParties({ ...currentParams, filterDate });
	};

	const orderHandler = (orderBy: string) => {
		updateQueryParams({ ...currentParams, orderBy });
		getParties({ ...currentParams, orderBy });
	};

	const dateRangeHandler = (startDate: string, endDate: string) => {
		updateQueryParams({ ...currentParams, startDate, endDate });
		getParties({ ...currentParams, startDate, endDate });
	};

	const clearAllFilters = () => {
		clearQueryParams();
		getParties();
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
						onSearch={searchHandler}
					/>
					<Filter
						sortOptions={sortOptions}
						dateOptions={dateOptions}
						handleSorting={sortByHandler}
						handleDateFiltering={dateFilterHandler}
					/>
					<DateRangePicker onDateChange={dateRangeHandler} />
					<OrderSwitch onOrderBy={orderHandler} />
					<ClearParams onClear={clearAllFilters} />
				</Group>
				<LayoutOptions />
			</Flex>
		</PageHeader>
	);
}

export default PartyListHeader;
