import InvitePartyMember from "../InvitePartyMember";
import { ActionIcon, Button, Flex, Group, Stack, Title } from "@mantine/core";
import { Edit, Plus, Settings2, Trash2 } from "lucide-react";
import MenuOptions from "../../../components/menu/MenuOptions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePartyStore from "../../../stores/usePartyStore";
import PageHeader from "../../../components/header/PageHeader";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";
import { useForm } from "@mantine/form";
import { Party } from "../../../shared/types/party.types";
import { useEffect, useRef } from "react";
import {
	sortOptions,
	priorityOptions,
	dateOptions,
	orderOptions,
} from "../../../shared/options/quest-filter.options";
import { useDisclosure } from "@mantine/hooks";
import FilterModal from "../../filters/FilterModal";
import useQuestStore from "../../../stores/useQuestStore";
import useQueryUpdater from "../../../hooks/useQueryUpdater";
import useUserStore from "../../../stores/useUserStore";

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
	const { getQuests } = useQuestStore();
	const { partyId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const parseQueryParams = () => {
		const searchParams = new URLSearchParams(location.search);

		const searchQuery = searchParams.get("search") || "";
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

	const getQuestsCallBack = async (params: Record<string, any>) => {
		if (partyId) {
			await getQuests(partyId, params);
		}
	};

	const {
		handleSearch,
		resetSearchAndFetch,
		applyFilters,
		resetFiltersAndFetch,
	} = useQueryUpdater({ fetchCallback: getQuestsCallBack });

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
		resetFiltersAndFetch();
		closeFilters();
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
		<>
			<FilterModal
				filterOpened={isFilterOpened}
				sortOptions={sortOptions}
				dateOptions={dateOptions}
				orderOptions={orderOptions}
				priorityOptions={priorityOptions}
				handleCloseFilterModal={closeFilters}
				onApplyFilters={handleApplyFilters}
				onClearFilters={handleClearFilters}
			/>
			<PageHeader
				title={party.title}
				optionsComp={partyOptions}
				actionBtn={newMemberBtn}
				userRole={party.currentUserRole}
			>
				<Stack gap={16}>
					<Title size="lg">{party.description}</Title>

						<InvitePartyMember
							userRole={party.currentUserRole}
							members={party.members}
							onOpenHandler={openMemberInvite}
						/>
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
				</Stack>
			</PageHeader>
		</>
	);
}

export default PartyHeader;
