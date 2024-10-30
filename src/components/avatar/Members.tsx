import { Tooltip, Avatar } from "@mantine/core";
import { SimpleMember } from "../../shared/types/campaign.types";

type MemberProps = {
	members: SimpleMember[];
	totalMembers: number;
	numOfMembersToShow: number;
};

function Members({ members, totalMembers, numOfMembersToShow }: MemberProps) {
	const showableMembers = members.slice(0, numOfMembersToShow);
	return (
		<Tooltip.Group
			openDelay={300}
			closeDelay={100}
		>
			<Avatar.Group spacing="sm">
				{showableMembers.map((member, index) => (
					<Tooltip
						key={index}
						label={member.displayName}
						withArrow
					>
						<Avatar
							src="image.png"
							radius="xl"
						/>
					</Tooltip>
				))}
				{members.length > 5 ? (
					<Avatar radius="xl">+{totalMembers}</Avatar>
				) : null}
			</Avatar.Group>
		</Tooltip.Group>
	);
}

export default Members;
