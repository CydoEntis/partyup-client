import { Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import PageHeader from "../../../components/header/PageHeader";
import DateRangePicker from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import { useQueryParams } from "../../../hooks/useQueryParams";
import usePartyStore from "../../../stores/usePartyStore";
import Filter from "../../../components/input/Filter";

function PartyListHeader() {
	const { getParties } = usePartyStore();
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const { updateQueryParams, getSearchParams } = useQueryParams();

	const sortOptions = [
		{ label: "Title", value: "title" },
		{ label: "Priority", value: "priority" },
	];

	const dateOptions = [
		{ label: "Created On", value: "created-at" },
		{ label: "Last Updated", value: "last-updated" },
	];

	const searchHandler = (search: string) => {
		const currentParams = getSearchParams();
		updateQueryParams({ ...currentParams, search });
		getParties({ ...currentParams, search });
	};

	const filterHandler = (filter: string) => {
		const currentParams = getSearchParams();
		updateQueryParams({ ...currentParams, filter });
		getParties({ ...currentParams, filter });
	};

	const orderHandler = (orderBy: string) => {
		const currentParams = getSearchParams();
		updateQueryParams({ ...currentParams, orderBy });
		getParties({ ...currentParams, orderBy });
	};

	const dateRangeHandler = (startDate: string, endDate: string) => {
		const currentParams = getSearchParams();
		updateQueryParams({ ...currentParams, startDate, endDate });
		getParties({ ...currentParams, startDate, endDate });
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
						handleFiltering={filterHandler}
					/>
					<DateRangePicker onDateChange={dateRangeHandler} />
					<OrderSwitch onOrderBy={orderHandler} />
				</Group>
				<LayoutOptions />
			</Flex>
		</PageHeader>
	);
}

export default PartyListHeader;
