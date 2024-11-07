import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

type PartyViewType = "edit" | "create";

function useQuestDrawer() {
	const [partyViewType, setPartyViewType] = useState<PartyViewType>("create");

	const [
		openedInviteMember,
		{ open: openMemberInvite, close: closeMemberInvite },
	] = useDisclosure(false);

	const [openedParty, { open: openParty, close: closeParty }] =
		useDisclosure(false);

	const handleNewParty = () => {
		setPartyViewType("create");
		openParty();
	};

	const handleEditParty = () => {
		setPartyViewType("edit");
		openParty();
	};

	return {
		partyViewType,
		setPartyViewType,
		openedInviteMember,
		openMemberInvite,
		closeMemberInvite,
		openedParty,
		openParty,
		closeParty,
		handleNewParty,
		handleEditParty,
	};
}

export default useQuestDrawer;
