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
import { useState } from "react";
import useMemberStore from "../../stores/useMemberStore";

type ManageCreatorProps = { partyId: number };

function ManageCreator({ partyId }: ManageCreatorProps) {
	const { creator, members, changeCreator } = useMemberStore();
	const [newCreator, setNewCreator] = useState<ComboboxItem | null>(null);
	const [oldCreatorRole, setOldCreatorRole] = useState<ComboboxItem | null>(
		null,
	);

	//TODO: Add logic to also update the parties creator to the new creator.
	const handleUpdateCreator = async () => {
		if (newCreator && oldCreatorRole && creator) {
			const updatedCreator = {
				partyId,
				newCreatorId: +newCreator.value,
				oldCreatorId: +creator.id,
				oldCreatorRole: oldCreatorRole.value as "member" | "maintainer",
			};

			console.log("UPDATE: ", updatedCreator);
			await changeCreator(updatedCreator);
		}
	};

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

			<Flex
				gap={8}
				justify="center"
			>
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
				onClick={handleUpdateCreator}
			>
				Change Creator
			</Button>
		</Stack>
	);
}

export default ManageCreator;
