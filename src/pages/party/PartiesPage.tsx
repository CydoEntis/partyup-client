import { useEffect } from "react";
import usePartytore from "../../stores/usePartyStore";
import { Box, Flex, Group, Title } from "@mantine/core";
import PartiesTabs from "../../features/party/PartiesTabs";

type Props = {};

function PartiesPage({}: Props) {
	return (
		<Box>
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
							<Title size="2.5rem">Your Parties</Title>
						</Group>
					</Group>
				</Flex>
			</Box>
			<PartiesTabs />
		</Box>
	);
}

export default PartiesPage;
