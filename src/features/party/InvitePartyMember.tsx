import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus } from "lucide-react";
import Members from "../../components/avatar/Members";
import { Member } from "../../shared/types/member.types";

type InvitePartyMemberProps = {
	onOpenHandler: () => void;
	members: Member[];
	userRole: string;
};

function InvitePartyMember({
	onOpenHandler,
	members,
	userRole,
}: InvitePartyMemberProps) {
	return (
		<Group pb={16}>
			<Group align="center">
				<Users2 size={20} />
				<Text>Party Members</Text>
				<Members
					members={members}
					numOfMembersToShow={5}
				/>
			</Group>

			{userRole === "Creator" || userRole === "Maintainer" ? (
				<Button
					variant="light"
					color="violet"
					rightSection={<Plus size={20} />}
					onClick={onOpenHandler}
				>
					Invite Member
				</Button>
			) : null}
		</Group>
	);
}

export default InvitePartyMember;
