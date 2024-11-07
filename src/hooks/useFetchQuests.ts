import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuestStore from "../stores/useQuestStore";
import { PaginatedQuests } from "../shared/types/quest.types";

type UseFetchQuestsResult = {
	paginatedQuests: PaginatedQuests | null;
	loading: boolean;
};

function useFetchQuests(): UseFetchQuestsResult {
	const { partyId, questId } = useParams();
	const { getQuests, paginatedQuests, loading } = useQuestStore();

	useEffect(() => {
		const fetchParty = async () => {
			if (partyId) {
				try {
					await getQuests(partyId);
				} catch (error) {
					console.error("Error fetching party or quests:", error);
				}
			}
		};

		fetchParty();
	}, [partyId, getQuests, questId]);

	return { paginatedQuests, loading };
}

export default useFetchQuests;
