import { useEffect } from "react";
import usePartytore from "../../stores/usePartyStore";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Group, Stack, Title } from "@mantine/core";
import PartyCard from "../../features/party/PartyCard";

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
		<>
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

			<Stack gap={8}>
				{parties && parties.items.map((party) => <PartyCard party={party} />)}
			</Stack>
		</>
	);
}

export default PartiesPage;
