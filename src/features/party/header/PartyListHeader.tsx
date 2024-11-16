import PageHeader from "../../../components/header/PageHeader";
import { Flex, Group } from "@mantine/core";
import DateRangePicker from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import Filter from "../../../components/input/Filter";
import { useForm } from "@mantine/form";

type Props = {};

function PartyListHeader({}: Props) {
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const filterOptions = [
		{ label: "Title", value: "title" },
		{ label: "Created", value: "created-at" },
		{ label: "Last Updated", value: "last-updated" },
	];

	const searchHandler = () => {
		console.log("Searching for:", form.values.search);
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
					<Filter filterOptions={filterOptions} />
					<DateRangePicker />
					<OrderSwitch />
				</Group>
				<LayoutOptions />
			</Flex>
		</PageHeader>
	);
}

export default PartyListHeader;
