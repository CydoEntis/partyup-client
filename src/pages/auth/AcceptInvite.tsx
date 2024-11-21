import { Button, Center, Flex, Paper, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import usePartyStore from "../../stores/usePartyStore";
import { useParams } from "react-router-dom";

type Props = {};

function AcceptInvite({}: Props) {
	const { partyId } = useParams<{ partyId: string }>(); // Type the params to ensure `partyId` is string
	const { getParty, party } = usePartyStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchParty = async () => {
			if (partyId) {
				await getParty(partyId); // Fetch party data
				setLoading(false); // Set loading to false after data is fetched
			}
		};
		fetchParty();
	}, [partyId, getParty]);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (!party) {
		return <Text>Party not found</Text>;
	}

	return (
		<Center p={32}>
			<Paper
				withBorder
				p={16}
				w={300}
			>
				<Text ta="center">You have been invited to join</Text>
				<Title size="xl" ta="center" fw={700}>{party.title}</Title>
				<Flex
					gap={4}
					align="center"
					my={8}
				>
					<Button
						variant="light"
						color="violet"
						fullWidth
					>
						Accept
					</Button>
					<Button
						variant="light"
						color="red"
						fullWidth
					>
						Decline
					</Button>
				</Flex>
			</Paper>
		</Center>
	);
}

export default AcceptInvite;
