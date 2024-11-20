import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus, UserCog } from "lucide-react";
import Members from "../../components/avatar/Members";
import { Member } from "../../shared/types/member.types";
import { MEMBER_ROLES } from "../../shared/constants/roles";

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

			{userRole === MEMBER_ROLES.CREATOR ||
			userRole === MEMBER_ROLES.MAINTAINER ? (
				<Button
					variant="light"
					color="violet"
					rightSection={<UserCog size={20}/>}
					onClick={onOpenHandler}
				>
					Manage Members
				</Button>
			) : null}
		</Group>
	);
}

export default InvitePartyMember;
