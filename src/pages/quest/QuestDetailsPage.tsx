import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";
import { useDisclosure } from "@mantine/hooks";
import ViewQuestDrawer from "../../features/quest/QuestDrawer";
import { Tabs } from "@mantine/core";
import SimpleGridLayout from "../../components/layout/SimpleGridLayout";
import QuestCard from "../../features/quest/QuestCard";

type Props = {};

function QuestsPage({}: Props) {
	const { partyId } = useParams();
	const { getQuests, paginatedQuests } = useQuestStore();
	const [openedViewQuest, { open: openViewQuest, close: closeViewQuest }] =
		useDisclosure(false);

	useEffect(() => {
		const fetchQuests = async () => {
			if (partyId) {
				await getQuests(partyId);
			}
		};
		fetchQuests();
	}, [partyId]);

	return (
		<>
			<ViewQuestDrawer
				isOpened={openedViewQuest}
				onClose={closeViewQuest}
			/>
			<Tabs.Panel
				value="grid"
				p={16}
			>
				<SimpleGridLayout cols={6}>
					{paginatedQuests.items.map((quest) => (
						<QuestCard
							key={quest.id}
							quest={quest}
							onClick={openViewQuest}
						/>
					))}
				</SimpleGridLayout>
			</Tabs.Panel>
			<Tabs.Panel value="list">List Tab View</Tabs.Panel>
		</>
	);
}

export default QuestsPage;
