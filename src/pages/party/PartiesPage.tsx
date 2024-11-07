import { useEffect } from "react";
import usePartytore from "../../stores/usePartyStore";
import { Link } from "react-router-dom";
import { Stack } from "@mantine/core";

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
		<div className="p-8">
			<Stack gap={8}>
				{parties &&
					parties.items.map((party) => (
						<Link
							key={party.id}
							to={`/party/${party.id}/quests`}
						>
							{party.title}
						</Link>
					))}
			</Stack>
		</div>
	);
}

export default PartiesPage;
