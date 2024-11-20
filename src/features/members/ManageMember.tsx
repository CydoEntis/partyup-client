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
import { X } from "lucide-react";
import UserAvatar from "../../components/avatar/UserAvatar";
import { MEMBER_ROLES } from "../../shared/constants/roles";
import { Member, UpdateMemberRole } from "../../shared/types/member.types";
import useMemberStore from "../../stores/useMemberStore"; // Import the store
import { useState } from "react";

type ManageMemberProps = {
	member: Member;
	onUpdateMember: (updatedMember: UpdateMemberRole) => void;
};

function ManageMember({ member, onUpdateMember }: ManageMemberProps) {
	// const handleRemove = () => {
	// 	onRemove(member.id);
	// };

	const [value, setValue] = useState<ComboboxItem | null>(null);

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
					label="Role"
					placeholder="Select Role"
					data={[
						{ value: MEMBER_ROLES.MAINTAINER, label: "Maintainer" },
						{ value: MEMBER_ROLES.MEMBER, label: "Member" },
					]}
					defaultValue={member.role || MEMBER_ROLES.MEMBER}
					onChange={(_value, option) => handleUpdatedRole(option)}
					allowDeselect={false}
				/>

				{/* <Tooltip label="Remove">
					<Checkbox
						checked={selectedMembers.includes(member.id)}
						onClick={handleRemove}
					/>
	
				</Tooltip> */}
			</Group>
		</Flex>
	);
}

export default ManageMember;
