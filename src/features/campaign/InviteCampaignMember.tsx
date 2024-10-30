import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus } from "lucide-react";
import Members from "../../components/avatar/Members";
import { Member } from "../../shared/types/member.types";

type InviteCampaignMemberProps = {
	onOpenHandler: () => void;
	members: Member[];
};

function InviteCampaignMember({
	onOpenHandler,
	members,
}: InviteCampaignMemberProps) {
	return (
		<Group>
			<Group align="center">
				<Users2 size={20} />
				<Text>Assign to Campaign</Text>
				<Members
					members={members}
					totalMembers={members.length}
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

export default InviteCampaignMember;
