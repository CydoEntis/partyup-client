import InvitePartyMember from "./InvitePartyMember";
import { Box, Button, Flex, Group, Title } from "@mantine/core";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Member } from "../../shared/types/member.types";
import MenuOptions from "../../components/menu/MenuOptions";
import { useNavigate, useParams } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";

type PartyHeaderProps = {
	title: string;
	members: Member[];
	handleEditParty: () => void;
	handleNewQuest: () => void;
	openMemberInvite: () => void;
};

function PartyHeader({
	title,
	members,
	handleEditParty,
	handleNewQuest,
	openMemberInvite,
}: PartyHeaderProps) {
	const { deleteParty } = usePartyStore();
	const { partyId } = useParams();
	const navigate = useNavigate();

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

	return (
		<Box
			bg="secondary"
			p={16}
		>
			<Flex
				justify="space-between"
				align="center"
				w="100%"
				pb={16}
			>
				<Group
					align="center"
					w="100%"
					justify="space-between"
				>
					<Group>
						<Title size="2.5rem">{title}</Title>
						<MenuOptions options={menuOptions} />
					</Group>
					<Button
						variant="light"
						color="violet"
						rightSection={<Plus />}
						onClick={handleNewQuest}
					>
						New Quest
					</Button>
				</Group>
			</Flex>
			<InvitePartyMember
				members={members}
				onOpenHandler={openMemberInvite}
			/>
		</Box>
	);
}

export default PartyHeader;

