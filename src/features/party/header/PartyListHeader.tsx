import PageHeader from "../../../components/header/PageHeader";
import { Flex, Group } from "@mantine/core";
import DateRangePicker from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import Filter from "../../../components/input/Filter";
import { useForm } from "@mantine/form";
import usePartyStore from "../../../stores/usePartyStore";
import { useQueryParams } from "../../../hooks/useQueryParams";

type Props = {};

function PartyListHeader({}: Props) {
	const { getParties } = usePartyStore();
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const { updateQueryParams, getSearchParams } = useQueryParams();

	const filterOptions = [
		{ label: "Title", value: "title" },
		{ label: "Created", value: "created-at" },
		{ label: "Last Updated", value: "last-updated" },
	];

	const currentParams = getSearchParams();

	const searchHandler = (search: string) => {
		updateQueryParams({ ...currentParams, search });
		getParties({ ...currentParams, search });
	};

	const filterHandler = (filter: string) => {
		updateQueryParams({ ...currentParams, filter });
		getParties({ ...currentParams, filter });
	};

	const orderHandler = (orderBy: string) => {
		updateQueryParams({ ...currentParams, orderBy });
		getParties({ ...currentParams, orderBy });
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
						filterOptions={filterOptions}
						handleFiltering={filterHandler}
					/>
					<DateRangePicker />
					<OrderSwitch onOrderBy={orderHandler} />
				</Group>
				<LayoutOptions />
			</Flex>
		</PageHeader>
	);
}

export default PartyListHeader;
