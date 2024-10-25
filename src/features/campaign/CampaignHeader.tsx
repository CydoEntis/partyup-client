import { ActionIcon, Box, Flex, Group, Stack, Title } from "@mantine/core";
import { Edit } from "lucide-react";

import { ReactNode } from "react";

type CampaignHeaderProps = {
	children: ReactNode;
};

function CampaignHeader({ children }: CampaignHeaderProps) {
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
						<Title size="2.5rem">Product Development</Title>
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
