import {
	ActionIcon,
	Box,
	Button,
	Flex,
	Group,
	Title,
} from "@mantine/core";
import { Edit, Plus } from "lucide-react";

import { ReactNode } from "react";

type CampaignHeaderProps = {
	title: string;
	onNewQuestHandler: () => void;
	children: ReactNode;
};

function CampaignHeader({ title, children, onNewQuestHandler }: CampaignHeaderProps) {
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
						>
							<Edit size={20} />
						</ActionIcon>
					</Group>
					<Button
						variant="light"
						color="violet"
						rightSection={<Plus />}
						onClick={onNewQuestHandler}
					>
						New Quest
					</Button>
				</Group>
			</Flex>
			{children}
		</Box>
	);
}

export default CampaignHeader;
