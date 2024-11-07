import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import usePartyStore from "../stores/usePartyStore";

function useFetchRecentParties() {
	const { getParties, parties } = usePartyStore();
	const { partyId } = useParams();
	const [searchParams] = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchParties = async () => {
			setLoading(true);
			setError(null);
			try {
				const queryParams: { [key: string]: string | undefined } = {};
				searchParams.forEach((value, key) => {
					queryParams[key] = value;
				});
				await getParties(queryParams);
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

		fetchParties();
	}, [searchParams, getParties, partyId]);

	return { parties, loading, error };
}

export default useFetchRecentParties;
