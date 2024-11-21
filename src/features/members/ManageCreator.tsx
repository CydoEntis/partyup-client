import {
	Flex,
	Select,
	Group,
	Text,
	ComboboxItem,
	Stack,
	Button,
} from "@mantine/core";
import UserAvatar from "../../components/avatar/UserAvatar";
import { MEMBER_ROLES } from "../../shared/constants/roles";
import { Member, UpdateMemberRole } from "../../shared/types/member.types";
import { useState } from "react";
import { Crown } from "lucide-react";
import useMemberStore from "../../stores/useMemberStore";

type ManageCreatorProps = {partyId: number};

function ManageCreator({partyId}: ManageCreatorProps) {
	const { creator, members,  } = useMemberStore();
	const [newCreator, setNewCreator] = useState<ComboboxItem | null>(null);
	const [oldCreatorRole, setOldCreatorRole] = useState<ComboboxItem | null>(
		null,
	);

	const handleUpdatedRole = (option: ComboboxItem) => {
		const updatedCreator = {
			partyId,
			newCreatorId: newCreator?.value,
			oldCreatorId: creator?.id,
			oldCreatorRole: oldCreatorRole?.value,
		};
		// const updatedMemberRole: UpdateMemberRole = {
		// 	id: creator.id,
		// 	role: option.value as "creator" | "maintainer" | "member",
		// };

		// onUpdateMember(updatedMemberRole);
	};

	console.log(newCreator);
	console.log(oldCreatorRole);

	return (
		<Stack>
			<Group>
				{creator && (
					<>
						<UserAvatar avatar={creator.avatar} />
						<Text>{creator.displayName}</Text>
					</>
				)}
			</Group>

			<Flex gap={8} justify="center">
				{members && members.items && (
					<Select
						label="New Creator"
						placeholder="Select a Member"
						data={members.items.map((member) => ({
							value: member.id.toString(),
							label: member.displayName,
						}))}
						onChange={(_value, option) => setNewCreator(option)}
						allowDeselect={false}
					/>
				)}
				{creator && (
					<Select
						label="Old Creators New Role"
						placeholder="Select Role"
						data={[
							{ value: MEMBER_ROLES.MAINTAINER, label: "Maintainer" },
							{ value: MEMBER_ROLES.MEMBER, label: "Member" },
						]}
						defaultValue={creator.role || MEMBER_ROLES.MEMBER}
						onChange={(_value, option) => setOldCreatorRole(option)}
						allowDeselect={false}
					/>
				)}
			</Flex>
			<Button
				variant="light"
				color="violet"
			>
				Change Creator
			</Button>
		</Stack>
	);
}

export default ManageCreator;
