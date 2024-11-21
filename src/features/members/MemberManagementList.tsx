import { Stack, Divider, Button, Group, Flex } from "@mantine/core";
import ManageMember from "./ManageMember";
import { Member, UpdateMemberRole } from "../../shared/types/member.types";
import { useState } from "react";
import useMemberStore from "../../stores/useMemberStore";
import ManageCreator from "./ManageCreator";
import usePartyStore from "../../stores/usePartyStore";

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
	const { updateMemberRoles, deleteMembers } = useMemberStore();
	const { deleteMembersFromParty } = usePartyStore();
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

	const handleToggleRemove = (memberId: number) => {
		setMembersToRemove((prevState) => {
			if (prevState.includes(memberId)) {
				return prevState.filter((id) => id !== memberId);
			} else {
				return [...prevState, memberId];
			}
		});
	};

	const handleRemovingMembers = async () => {
		const toBeRemoved = {
			partyId,
			memberIds: membersToRemove,
		};

		await deleteMembers(toBeRemoved);
		await deleteMembersFromParty(toBeRemoved);
	};

	return (
		<Stack gap={8}>
			<Divider
				label="Creator"
				labelPosition="center"
			/>
			{creator && <ManageCreator partyId={partyId} />}

			{/* Maintainers Section */}
			{maintainers.length > 0 && (
				<Stack>
					<Divider
						label="Maintainers"
						labelPosition="center"
					/>
					{maintainers.map((maintainer) => (
						<ManageMember
							membersToRemove={membersToRemove}
							key={maintainer.id}
							member={maintainer}
							onUpdateMember={handleMemberRoleChange}
							onToggleRemove={handleToggleRemove}
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
							membersToRemove={membersToRemove}
							key={member.id}
							member={member}
							onUpdateMember={handleMemberRoleChange}
							onToggleRemove={handleToggleRemove}
						/>
					))}
				</Stack>
			)}
			<Flex gap={8}>
				<Button
					variant="light"
					color="violet"
					onClick={handleUpdateMemberRoles}
					fullWidth
				>
					Update Roles
				</Button>
				<Button
					variant="light"
					color="red"
					onClick={handleRemovingMembers}
					fullWidth
				>
					Remove Members
				</Button>
			</Flex>
		</Stack>
	);
}

export default MemberManagementList;
