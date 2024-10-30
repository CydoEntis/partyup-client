import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import useCampaignStore from "../stores/useCampaignStore";
import { PaginatedCampaigns } from "../shared/types/campaign.types";
import { AxiosError } from "axios";

function useFetchRecentCampaigns() {
	const { getCampaigns, campaigns } = useCampaignStore();
	const { campaignId } = useParams();
	const [searchParams] = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchCampaigns = async () => {
			setLoading(true);
			setError(null);
			try {
				const queryParams: { [key: string]: string | undefined } = {};
				searchParams.forEach((value, key) => {
					queryParams[key] = value;
				});
				await getCampaigns(queryParams);
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error);
				} else {
					console.error("Unexpected error:", error);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchCampaigns();
	}, [searchParams, getCampaigns, campaignId]);

	return { campaigns, loading, error };
}

export default useFetchRecentCampaigns;
