import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus, UserCog } from "lucide-react";
import Members from "../../components/avatar/Members";
import { Member } from "../../shared/types/member.types";
import { MEMBER_ROLES } from "../../shared/constants/roles";

type PartyMembersProps = {
	onOpenHandler: () => void;
	members: Member[];
	userRole: string;
};

function PartyMembers({ onOpenHandler, members, userRole }: PartyMembersProps) {
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

			<Button
				variant="light"
				color="violet"
				rightSection={<UserCog size={20} />}
				onClick={onOpenHandler}
			>
				{userRole === MEMBER_ROLES.CREATOR ||
				userRole === MEMBER_ROLES.MAINTAINER
					? "Manage Members"
					: "View Members"}
			</Button>
		</Group>
	);
}

export default PartyMembers;
