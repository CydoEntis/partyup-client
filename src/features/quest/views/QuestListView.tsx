import { ActionIcon, Paper, Table } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { Quest } from "../../../shared/types/quest.types";
import Members from "../../../components/avatar/Members";
import { formatDate } from "../../../shared/utils/date.utils";

type QuestListViewProps = {
	quests: Quest[];
};

function QuestListView({ quests }: QuestListViewProps) {
	const rows = quests.map((quest) => (
		<Table.Tr key={quest.id}>
			<Table.Td>{quest.title}</Table.Td>
			<Table.Td>{quest.description}</Table.Td>
			<Table.Td>
				<Members
					members={quest.members}
					numOfMembersToShow={3}
				/>
			</Table.Td>
			<Table.Td>{formatDate(quest.dueDate)}</Table.Td>
			<Table.Td>
				<ActionIcon
					variant="light"
					color="violet"
					component={NavLink}
					to={`/parties/${quest.id}/quests`}
				></ActionIcon>
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

export default QuestListView;
