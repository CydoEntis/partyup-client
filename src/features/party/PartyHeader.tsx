import InvitePartyMember from "./InvitePartyMember";
import { ActionIcon, Box, Button, Flex, Group, Title } from "@mantine/core";
import { Edit, Plus } from "lucide-react";
import { Member } from "../../shared/types/member.types";

type PartyHeaderProps = {
	title: string;
	members: Member[];
	handleEditParty: () => void;
	handleNewQuest: () => void;
	openMemberInvite: () => void;
};

function PartyHeader({
	title,
	members,
	handleEditParty,
	handleNewQuest,
	openMemberInvite,
}: PartyHeaderProps) {
	return (
		<Box
			bg="secondary"
			p={16}
		>
			<Flex
				justify="space-between"
				align="center"
				w="100%"
				pb={16}
			>
				<Group
					align="center"
					w="100%"
					justify="space-between"
				>
					<Group>
						<Title size="2.5rem">{title}</Title>
						<ActionIcon
							variant="transparent"
							color="violet"
							onClick={handleEditParty}
						>
							<Edit size={20} />
						</ActionIcon>
					</Group>
					<Button
						variant="light"
						color="violet"
						rightSection={<Plus />}
						onClick={handleNewQuest}
					>
						New Quest
					</Button>
				</Group>
			</Flex>
			<InvitePartyMember
				members={members}
				onOpenHandler={openMemberInvite}
			/>
		</Box>
	);
}

export default PartyHeader;
