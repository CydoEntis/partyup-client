import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus } from "lucide-react";
import Members from "../../components/avatar/Members";
import { Member } from "../../shared/types/member.types";
import { SimpleMember } from "../../shared/types/campaign.types";

type InviteCampaignMemberProps = {
	onOpenHandler: () => void;
	totalMembers: number;
	members: SimpleMember[];
};

function InviteCampaignMember({
	onOpenHandler,
	members,
	totalMembers,
}: InviteCampaignMemberProps) {
	return (
		<Group>
			<Group align="center">
				<Users2 size={20} />
				<Text>Assign to Campaign</Text>
				<Members
					members={members}
					totalMembers={totalMembers}
					numOfMembersToShow={Members.length}
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
