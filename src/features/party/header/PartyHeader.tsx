import InvitePartyMember from "../InvitePartyMember";
import { Button, Flex, Group, Stack, Title } from "@mantine/core";
import { Edit, Plus, Trash2 } from "lucide-react";
import MenuOptions from "../../../components/menu/MenuOptions";
import { useNavigate, useParams } from "react-router-dom";
import usePartyStore from "../../../stores/usePartyStore";
import PageHeader from "../../../components/header/PageHeader";
import SearchBar from "../../../components/input/SearchBar";
import Filter from "../../../components/input/Filter";
import DateRangePicker, { DateRangePickerHandle } from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import { useForm } from "@mantine/form";
import { Party } from "../../../shared/types/party.types";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useQuestStore from "../../../stores/useQuestStore";
import ClearParams from "../../../components/input/ClearParams";
import { useRef } from "react";

type PartyHeaderProps = {
	party: Party;
	handleEditParty: () => void;
	handleNewQuest: () => void;
	openMemberInvite: () => void;
};

function PartyHeader({
	party,
	handleEditParty,
	handleNewQuest,
	openMemberInvite,
}: PartyHeaderProps) {
	const { getQuests } = useQuestStore();
	const { deleteParty } = usePartyStore();
	const { partyId } = useParams();
	const navigate = useNavigate();

	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const { updateQueryParams, getSearchParams, clearQueryParams } =
		useQueryParams();

	const sortOptions = [
		{ label: "Title", value: "title" },
		{ label: "Priority", value: "priority" },
		{ label: "Created At", value: "" },
		{ label: "Updated At", value: "updated-at" },
		{ label: "Due Date", value: "due-date" },
	];

	const dateOptions = [
		{ label: "Created On", value: "created-at" },
		{ label: "Updated On", value: "updated-at" },
	];

	const currentParams = getSearchParams();

	 const dateRangePickerRef = useRef<DateRangePickerHandle>(null);

	const searchHandler = (search: string) => {
		updateQueryParams({ ...currentParams, search });
		if (partyId) {
			getQuests(partyId, { ...currentParams, search });
		}
	};

	const sortByHandler = (sortBy: string) => {
		updateQueryParams({ ...currentParams, sortBy });
		if (partyId) {
			getQuests(partyId, { ...currentParams, sortBy });
		}
	};

	const dateFilterHandler = (filterDate: string) => {
		updateQueryParams({ ...currentParams, filterDate });
		if (partyId) {
			getQuests(partyId, { ...currentParams, filterDate });
		}
	};

	const orderHandler = (orderBy: string) => {
		updateQueryParams({ ...currentParams, orderBy });
		if (partyId) {
			getQuests(partyId, { ...currentParams, orderBy });
		}
	};

	const dateRangeHandler = (startDate: string, endDate: string) => {
		updateQueryParams({ ...currentParams, startDate, endDate });
		if (partyId) {
			getQuests(partyId, { ...currentParams, startDate, endDate });
		}
	};

	const clearAllFilters = () => {
		clearQueryParams();
		if (dateRangePickerRef.current) {
			dateRangePickerRef.current.reset();
		}
		if (partyId) {
			getQuests(partyId);
		}
	};

	const handleDelete = async () => {
		if (partyId) {
			deleteParty(partyId);
			navigate(`/parties`);
		}
	};

	const menuOptions = [
		{
			icon: <Edit size={16} />,
			text: "Edit",
			onClick: handleEditParty,
		},
		{
			icon: <Trash2 size={16} />,
			text: "Delete",
			onClick: handleDelete,
		},
	];

	const partyOptions = <MenuOptions options={menuOptions} />;
	const newMemberBtn = (
		<Button
			variant="light"
			color="violet"
			rightSection={<Plus />}
			onClick={handleNewQuest}
		>
			New Quest
		</Button>
	);

	return (
		<PageHeader
			title={party.title}
			optionsComp={partyOptions}
			actionBtn={newMemberBtn}
		>
			<Stack gap={16}>
				<Title size="lg">{party.description}</Title>
				<InvitePartyMember
					members={party.members}
					onOpenHandler={openMemberInvite}
				/>
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
						<DateRangePicker
							onDateChange={dateRangeHandler}
							ref={dateRangePickerRef}
						/>
						<OrderSwitch onOrderBy={orderHandler} />
						<ClearParams onClear={clearAllFilters} />
					</Group>
					<LayoutOptions />
				</Flex>
			</Stack>
		</PageHeader>
	);
}

export default PartyHeader;
