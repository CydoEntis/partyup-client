import InviteCampaignMember from "./InviteCampaignMember";
import { ActionIcon, Box, Button, Flex, Group, Title } from "@mantine/core";
import { Edit, Plus } from "lucide-react";
import { Member } from "../../shared/types/member.types";

type CampaignHeaderProps = {
	title: string;
	members: Member[];
	handleEditCampaign: () => void;
	handleNewQuest: () => void;
	openMemberInvite: () => void;
};

function CampaignHeader({
	title,
	members,
	handleEditCampaign,
	handleNewQuest,
	openMemberInvite,
}: CampaignHeaderProps) {
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
							onClick={handleEditCampaign}
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
			<InviteCampaignMember
				members={members}
				onOpenHandler={openMemberInvite}
			/>
		</Box>
	);
}

export default CampaignHeader;
