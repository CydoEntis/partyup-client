import { Button, Group, Text } from "@mantine/core";
import { Users2, Plus } from "lucide-react";
import Members from "../../components/avatar/Members";

type InviteCampaignMemberProps = {
	onOpenHandler: () => void;
};

function InviteCampaignMember({ onOpenHandler }: InviteCampaignMemberProps) {
	return (
		<Group>
			<Group align="center">
				<Users2 size={20} />
				<Text>Assign to Campaign</Text>
				<Members
					members={[
						{ name: "Gandalf", avatar: 1 },
						{ name: "Bilbo Baggins", avatar: 2 },
						{ name: "Legolas", avatar: 2 },
						{ name: "Thorin", avatar: 1 },
						{ name: "Gimlee", avatar: 1 },
					]}
					totalMembers={3}
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
