import { Box, Flex, Group, Title } from "@mantine/core";
import { ReactElement, ReactNode } from "react";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import { MEMBER_ROLES } from "../../shared/constants/roles";

type PageHeaderProps = {
	title: string;
	optionsComp?: ReactElement;
	actionBtn?: ReactElement;
	children?: ReactNode;
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
					<Group>
						<Title size="2.5rem">{title}</Title>
						{(userRole === MEMBER_ROLES.CREATOR || userRole === MEMBER_ROLES.MAINTAINER) &&
							optionsComp}
					</Group>
					{(userRole === MEMBER_ROLES.CREATOR || userRole === MEMBER_ROLES.MAINTAINER) &&
						actionBtn && <Box>{actionBtn}</Box>}
				</Group>
			</Flex>
			{children}
		</Box>
	);
}

export default PageHeader;
