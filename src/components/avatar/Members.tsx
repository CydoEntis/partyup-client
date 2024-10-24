import { Tooltip, Avatar } from "@mantine/core";

type MemberProps = {
	members: { name: string; avatar: number }[];
	totalMembers: number;
};

function Members({ members, totalMembers }: MemberProps) {
	return (
		<Tooltip.Group
			openDelay={300}
			closeDelay={100}
		>
			<Avatar.Group spacing="sm">
				{members.map((member) => (
					<Tooltip
						label={member.name}
						withArrow
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
