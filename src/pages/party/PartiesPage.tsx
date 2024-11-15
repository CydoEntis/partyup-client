import { ActionIcon, Flex, Group, Tooltip } from "@mantine/core";
import PageHeader from "../../components/header/PageHeader";
import QuestSearchBar from "../../features/quest/QuestSearchBar";
import { LayoutGrid, LayoutList } from "lucide-react";

type Props = {};

function PartiesPage({}: Props) {
	return (
		<PageHeader title="Joined Parties">
			<Flex
				align="end"
				justify="space-between"
			>
				<QuestSearchBar />
				<Group>
					<Tooltip label="Grid View">
						<ActionIcon
							size="lg"
							variant="light"
							color="violet"
						>
							<LayoutGrid size={20} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="List View">
						<ActionIcon
							size="lg"
							variant="light"
							color="violet"
						>
							<LayoutList size={20} />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Flex>
		</PageHeader>
	);
}

export default PartiesPage;
