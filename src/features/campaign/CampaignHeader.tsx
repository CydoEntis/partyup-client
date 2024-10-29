import { Box } from "@mantine/core";

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
			{children}
		</Box>
	);
}

export default CampaignHeader;
