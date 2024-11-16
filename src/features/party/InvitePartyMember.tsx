import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus } from "lucide-react";
import Members from "../../components/avatar/Members";
import { Member } from "../../shared/types/member.types";

type InvitePartyMemberProps = {
	onOpenHandler: () => void;
	members: Member[];
};

function InvitePartyMember({
	onOpenHandler,
	members,
}: InvitePartyMemberProps) {
	return (
		<Group pb={16}>
			<Group align="center">
				<Users2 size={20} />
				<Text>Assign to Party</Text>
				<Members
					members={members}
					numOfMembersToShow={5}
				/>
			</Group>

			<Button
				variant="light"
				color="violet"
				rightSection={<Plus size={20} />}
				onClick={onOpenHandler}
			>
				Invite Member
			</Button>
		</Group>
	);
}

export default InvitePartyMember;
