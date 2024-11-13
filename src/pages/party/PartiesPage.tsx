import { useEffect } from "react";
import usePartytore from "../../stores/usePartyStore";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Group, SimpleGrid, Stack, Title } from "@mantine/core";
import PartyCard from "../../features/party/PartyCard";
import PartiesTabs from "../../features/party/PartiesTabs";

type Props = {};

function PartiesPage({}: Props) {
	const { getParties, parties } = usePartytore();

	useEffect(() => {
		const fetchParty = async () => {
			await getParties();
		};
		fetchParty();
	}, []);

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
