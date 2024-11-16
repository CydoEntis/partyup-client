import { Box } from "@mantine/core";
import { ReactElement } from "react";

type PageFooterProps = {
	children?: ReactElement;
};

function PageFooter({ children }: PageFooterProps) {
	return <Box px={32} py={16}>{children}</Box>;
}

export default PageFooter;
