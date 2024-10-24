import { Tooltip, Avatar } from "@mantine/core";

type MemberProps = {
	members: { name: string; avatar: number }[];
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
						label={member.name}
						withArrow
						key={index}
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
