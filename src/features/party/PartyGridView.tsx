import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import { Skeleton } from "@mantine/core";
import PartyCard from "../../features/party/PartyCard";
import { Party } from "../../shared/types/party.types";

type PartyGridViewProps = {
	loading: boolean;
	parties: Party[];
};

function PartyGridView({ loading, parties }: PartyGridViewProps) {
	return (
		<SimpleGridLayout cols={6}>
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
		</SimpleGridLayout>
	);
}

export default PartyGridView;
