import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import { SimpleGrid, Skeleton } from "@mantine/core";
import PartyCard from "../../features/party/PartyCard";
import { Party } from "../../shared/types/party.types";

type PartyGridViewProps = {
	loading: boolean;
	parties: Party[];
};

function PartyGridView({ loading, parties }: PartyGridViewProps) {
	return (
		<SimpleGrid
			type="container"
			cols={{
				base: 1,
				"550px": 1,
				"725px": 2,
				"1000px": 3,
				"1700px": 4,
				"2000px": 6,
			}}
		>
			{loading
				? Array.from({ length: 12 }).map((_, index) => (
						<Skeleton
							key={index}
							height={350}
							mb="md"
						/>
				  ))
				: parties &&
				  parties.map((party) => (
						<PartyCard
							key={party.id}
							party={party}
						/>
				  ))}
		</SimpleGrid>
	);
}

export default PartyGridView;
