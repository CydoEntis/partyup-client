import { Tooltip, Avatar } from "@mantine/core";
import { Member } from "../../shared/types/member.types";

type MemberProps = {
	members: Member[];
	totalMembers: number;
	numOfMembersToShow: number;
};

function Members({ members, totalMembers, numOfMembersToShow }: MemberProps) {
	const showableMembers = members.slice(0, numOfMembersToShow);
	const remainingMembers = totalMembers - numOfMembersToShow;

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
				{remainingMembers > 0 ? (
					<Avatar radius="xl">+{remainingMembers}</Avatar>
				) : null}
			</Avatar.Group>
		</Tooltip.Group>
	);
}

export default Members;
