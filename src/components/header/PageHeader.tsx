import { Box, Flex, Group, Title } from "@mantine/core";
import { ReactElement } from "react";
import useGetColorTheme from "../../hooks/useGetColorTheme";

type PageHeaderProps = {
	title: string;
	optionsComp?: ReactElement;
	actionBtn?: ReactElement;
	children?: ReactElement;
	userRole?: string;
};

function PageHeader({
	title,
	optionsComp,
	actionBtn,
	children,
	userRole,
}: PageHeaderProps) {
	const { isLightMode } = useGetColorTheme();

	return (
		<Box
			bg="secondary"
			px={32}
			py={16}
			className={`border-b ${
				isLightMode ? "border-[#DCDEE0]" : "border-[#3A3A3A]"
			}`}
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
					{(userRole === "Creator" || userRole === "Maintainer") && (
						<Group>
							<Title size="2.5rem">{title}</Title>
							{optionsComp}
						</Group>
					)}
					{(userRole === "Creator" || userRole === "Maintainer") &&
						actionBtn && <Box>{actionBtn}</Box>}
				</Group>
			</Flex>
			{children}
		</Box>
	);
}

export default PageHeader;
