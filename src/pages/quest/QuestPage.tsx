import { useEffect } from "react";
import useQuestStore from "../../stores/useQuestStore";
import { useParams } from "react-router-dom";

type Props = {};

function QuestPage({}: Props) {
	const {
		quest,
		getQuest,
		loading: { detail: loadingDetails },
	} = useQuestStore();
	const { partyId, questId } = useParams();
	useEffect(() => {
		const fetchQuest = async () => {
			if (partyId && questId) {
				await getQuest(partyId, questId);
			}
		};

		fetchQuest();
	}, [partyId, questId]);

	if (!quest || loadingDetails) return <p>Loading...</p>;

	return <div>{quest.title}</div>;
}

export default QuestPage;
