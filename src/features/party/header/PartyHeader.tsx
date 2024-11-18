import InvitePartyMember from "../InvitePartyMember";
import { Button, Flex, Group, Stack, Title } from "@mantine/core";
import { Edit, Plus, Trash2 } from "lucide-react";
import MenuOptions from "../../../components/menu/MenuOptions";
import { useNavigate, useParams } from "react-router-dom";
import usePartyStore from "../../../stores/usePartyStore";
import PageHeader from "../../../components/header/PageHeader";
import SearchBar from "../../../components/input/SearchBar";
import DateRangePicker from "../../../components/input/DateRangePicker";
import OrderSwitch from "../../../components/input/OrderSwitch";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import { useForm } from "@mantine/form";
import { Party } from "../../../shared/types/party.types";
import ClearParams from "../../../components/input/ClearParams";
import { useRef } from "react";
import useQueryUpdater from "../../../hooks/useQuestQueryUpdater";
import {
	sortOptions,
	priorityOptions,
	dateOptions,
} from "../../../shared/options/quest-filter.options";

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
	const { deleteParty } = usePartyStore();
	const { partyId } = useParams();
	const navigate = useNavigate();

	// Form for search input
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	// Custom hook for handling query updates
	const {
		clearAllParams,
		handleSearch,
		handleSort,
		handleDateFilter,
		handlePriorityFilter,
		handleOrder,
		handleDateRange,
	} = useQueryUpdater(partyId);

	const callbacksRef = useRef<Record<string, () => void>>({});

	const clearAllFilters = () => {
		Object.values(callbacksRef.current).forEach((reset) => reset());
		clearAllParams();
	};

	const handleDelete = async () => {
		if (partyId) {
			await deleteParty(partyId);
			navigate(`/parties`);
		}
	};

	const menuOptions = [
		{ icon: <Edit size={16} />, text: "Edit", onClick: handleEditParty },
		{ icon: <Trash2 size={16} />, text: "Delete", onClick: handleDelete },
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
							onSearch={handleSearch}
							resetCallback={(reset) => {
								callbacksRef.current.search = reset;
							}}
						/>
						{/* <Filter
							sortOptions={sortOptions}
							dateOptions={dateOptions}
							priorityOptions={priorityOptions}
							handleSorting={handleSort}
							handleDateFiltering={handleDateFilter}
							handlePriority={handlePriorityFilter}
							resetCallback={(reset) => {
								callbacksRef.current.filter = reset;
							}}
						/> */}
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
			</Stack>
		</PageHeader>
	);
}

export default PartyHeader;
