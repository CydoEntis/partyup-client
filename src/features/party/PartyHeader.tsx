import InvitePartyMember from "./InvitePartyMember";
import { Box, Button, Flex, Group, Stack, Title } from "@mantine/core";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Member } from "../../shared/types/member.types";
import MenuOptions from "../../components/menu/MenuOptions";
import { useNavigate, useParams } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";
import PageHeader from "../../components/header/PageHeader";
import SearchBar from "../../components/input/SearchBar";
import Filter from "../../components/input/Filter";
import DateRangePicker from "../../components/input/DateRangePicker";
import OrderSwitch from "../../components/input/OrderSwitch";
import LayoutOptions from "../../components/layout/LayoutOptions";
import { useForm } from "@mantine/form";
import { Party } from "../../shared/types/party.types";

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

	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const searchHandler = () => {
		console.log("Searching for:", form.values.search);
	};

	const filterOptions = [
		{ label: "Title", value: "title" },
		{ label: "Created", value: "created-at" },
		{ label: "Last Updated", value: "last-updated" },
	];

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
						<Filter filterOptions={filterOptions} />
						<DateRangePicker />
						<OrderSwitch />
					</Group>
					<LayoutOptions />
				</Flex>
			</Stack>
		</PageHeader>
	);
}

export default PartyHeader;
