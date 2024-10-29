import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuestStore from "../stores/useQuestStore";
import { PaginatedQuests } from "../shared/types/quest.types";

type UseFetchQuestsResult = {
	paginatedQuests: PaginatedQuests | null;
	loading: boolean;
};

function useFetchQuests(): UseFetchQuestsResult {
	const { campaignId } = useParams();
	const { getQuests, loading } = useQuestStore();
	const [paginatedQuests, setPaginatedQuests] =
		useState<PaginatedQuests | null>(null);

	useEffect(() => {
		const fetchCampaign = async () => {
			if (campaignId) {
				try {
					const paginatedQuests = await getQuests(Number(campaignId));
					setPaginatedQuests(paginatedQuests);
				} catch (error) {
					console.error("Error fetching campaign or quests:", error);
				}
			}
		};

		fetchCampaign();
	}, [campaignId, getQuests]);

	return { paginatedQuests, loading };
}

export default useFetchQuests;
