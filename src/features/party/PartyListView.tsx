import { ActionIcon, Paper, Table } from "@mantine/core";
import { Party } from "../../shared/types/party.types";
import Members from "../../components/avatar/Members";
import { formatDate } from "../../shared/utils/date.utils";
import { NavLink } from "react-router-dom";

type PartyListViewProps = {
	parties: Party[];
};

function PartyListView({ parties }: PartyListViewProps) {
	const rows = parties.map((party) => (
		<Table.Tr key={party.id}>
			<Table.Td>{party.title}</Table.Td>
			<Table.Td>{party.description}</Table.Td>
			<Table.Td>
				<Members
					members={party.members}
					numOfMembersToShow={3}
				/>
			</Table.Td>
			<Table.Td>{formatDate(party.dueDate)}</Table.Td>
			<Table.Td>
				<ActionIcon
					variant="light"
					color="violet"
					component={NavLink}
					to={`/parties/${party.id}/quests`}
				>
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<Paper
			withBorder
			p={16}
		>
			<Table>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Title</Table.Th>
						<Table.Th>Description</Table.Th>
						<Table.Th>Members</Table.Th>
						<Table.Th>Due Date</Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</Paper>
	);
}

export default PartyListView;
