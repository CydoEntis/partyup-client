import { Tooltip, Avatar } from "@mantine/core";
import { Member } from "../../shared/types/member.types";

type MemberProps = {
	members: Member[];
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
				{showableMembers.map((member) => (
					<Tooltip
						label={member.displayName}
						withArrow
						key={member.id}
					>
						<Avatar
							src="image.png"
							radius="xl"
						/>
					</Tooltip>
				))}
				<Avatar radius="xl">+{totalMembers}</Avatar>
			</Avatar.Group>
		</Tooltip.Group>
	);
}

export default Members;
