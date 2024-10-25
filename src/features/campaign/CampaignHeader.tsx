import { ActionIcon, Box, Flex, Group, Stack, Title } from "@mantine/core";
import { Edit } from "lucide-react";

import { ReactNode } from "react";

type CampaignHeaderProps = {
	title: string;
	children: ReactNode;
};

function CampaignHeader({ title, children }: CampaignHeaderProps) {
	return (
		<Box
			bg="secondary"
			p={16}
		>
			<Flex
				justify="space-between"
				align="center"
			>
				<Stack>
					<Group align="center">
						<Title size="2.5rem">{title}</Title>
						<ActionIcon
							variant="transparent"
							color="violet"
						>
							<Edit size={20} />
						</ActionIcon>
					</Group>
					{children}
				</Stack>
			</Flex>
		</Box>
	);
}

export default CampaignHeader;
