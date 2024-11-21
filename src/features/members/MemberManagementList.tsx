import { Stack, Divider, Button, Group } from "@mantine/core";
import ManageMember from "./ManageMember";
import { Member, UpdateMemberRole } from "../../shared/types/member.types";
import { useState } from "react";
import { MEMBER_ROLES } from "../../shared/constants/roles";
import useMemberStore from "../../stores/useMemberStore";
import ManageCreator from "./ManageCreator";

type MemberManagementProps = {
	partyId: number;
	creator: Member;
	maintainers: Member[];
	regularMembers: Member[];
};

function MemberManagementList({
	partyId,
	creator,
	maintainers,
	regularMembers,
}: MemberManagementProps) {
	const { updateMemberRoles } = useMemberStore();
	const [updatedMemberRoles, setUpdatedMemberRoles] = useState<
		UpdateMemberRole[]
	>([]);
	const [membersToRemove, setMembersToRemove] = useState<number[]>([]);

	const handleMemberRoleChange = (updatedMemberRole: UpdateMemberRole) => {
		setUpdatedMemberRoles((prevState) => {
			const existingMemberIndex = prevState.findIndex(
				(member) => member.id === updatedMemberRole.id,
			);

			if (existingMemberIndex !== -1) {
				const updatedRoles = [...prevState];
				updatedRoles[existingMemberIndex] = updatedMemberRole;
				return updatedRoles;
			} else {
				return [...prevState, updatedMemberRole];
			}
		});
	};

	const handleUpdateMemberRoles = async () => {
		await updateMemberRoles(partyId, updatedMemberRoles);
	};

	return (
		<Stack gap={8}>
			<Divider
				label="Creator"
				labelPosition="center"
			/>
			{creator && (
				<ManageCreator partyId={partyId}				/>
			)}

			{/* Maintainers Section */}
			{maintainers.length > 0 && (
				<Stack>
					<Divider
						label="Maintainers"
						labelPosition="center"
					/>
					{maintainers.map((maintainer) => (
						<ManageMember
							key={maintainer.id}
							member={maintainer}
							onUpdateMember={handleMemberRoleChange}
						/>
					))}
				</Stack>
			)}

			{/* Regular Members Section */}
			<Divider
				label="Members"
				labelPosition="center"
			/>
			{regularMembers.length > 0 && (
				<Stack>
					{regularMembers.map((member) => (
						<ManageMember
							key={member.id}
							member={member}
							onUpdateMember={handleMemberRoleChange}
						/>
					))}
				</Stack>
			)}
			<Button
				variant="light"
				color="violet"
				onClick={handleUpdateMemberRoles}
			>
				Update Roles
			</Button>
		</Stack>
	);
}

export default MemberManagementList;
