import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Campaign } from "../shared/types/campaign.types";
import useCampaignStore from "../stores/useCampaignStore";

type UseFetchCampaignResult = {
	campaign: Campaign | null;
	loading: boolean;
};

function useFetchCampaign(): UseFetchCampaignResult {
	const { campaignId } = useParams();
	const { getCampaign, loading } = useCampaignStore();
	const [campaign, setCampaign] = useState<Campaign | null>(null);

	useEffect(() => {
		const fetchCampaign = async () => {
			if (campaignId) {
				try {
					const campaignData = await getCampaign(Number(campaignId));
					setCampaign(campaignData);
				} catch (error) {
					console.error("Error fetching campaign or quests:", error);
				}
			}
		};

		fetchCampaign();
	}, [campaignId, getCampaign]);

	return { campaign, loading };
}

export default useFetchCampaign;
