import {
	Flex,
	Select,
	ActionIcon,
	Group,
	Tooltip,
	Text,
	Checkbox,
	ComboboxItem,
} from "@mantine/core";
import UserAvatar from "../../components/avatar/UserAvatar";
import { MEMBER_ROLES } from "../../shared/constants/roles";
import { Member, UpdateMemberRole } from "../../shared/types/member.types";
import { useState } from "react";

type ManageMemberProps = {
	member: Member;
	onUpdateMember: (updatedMember: UpdateMemberRole) => void;
	onToggleRemove: (memberId: number) => void;
	membersToRemove: number[];
};

function ManageMember({
	member,
	onUpdateMember,
	onToggleRemove,
	membersToRemove
}: ManageMemberProps) {
	const handleCheckboxChange = () => {
		onToggleRemove(member.id);
	};

	const [_, setValue] = useState<ComboboxItem | null>(null);

	const handleUpdatedRole = (option: ComboboxItem) => {
		setValue(option);
		const updatedMemberRole: UpdateMemberRole = {
			id: member.id,
			role: option.value as "creator" | "maintainer" | "member",
		};

		onUpdateMember(updatedMemberRole);
	};

	return (
		<Flex
			justify="space-between"
			align="center"
		>
			<Group key={member.id}>
				<UserAvatar avatar={member.avatar} />
				<Text>{member.displayName}</Text>
			</Group>

			<Group align="center">
				<Select
					size="xs"
					placeholder="Select Role"
					data={[
						{ value: MEMBER_ROLES.MAINTAINER, label: "Maintainer" },
						{ value: MEMBER_ROLES.MEMBER, label: "Member" },
					]}
					defaultValue={member.role || MEMBER_ROLES.MEMBER}
					onChange={(_value, option) => handleUpdatedRole(option)}
					allowDeselect={false}
				/>

				<Tooltip label="Remove">
					<Checkbox
					size="sm"
						checked={membersToRemove.includes(member.id)}
						onChange={handleCheckboxChange}
					/>
				</Tooltip>
			</Group>
		</Flex>
	);
}

export default ManageMember;
