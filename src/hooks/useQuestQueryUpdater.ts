import useQuestStore from "../stores/useQuestStore";
import { useQueryParams } from "./useQueryParams";

const useQueryUpdater = (partyId: string | undefined) => {
	const { updateQueryParams, getSearchParams, clearQueryParams } =
		useQueryParams();
	const { getQuests } = useQuestStore();

	const currentParams = getSearchParams();

	const updateAndFetch = (params: Record<string, any>) => {
		const updatedParams = { ...currentParams, ...params };
		updateQueryParams(updatedParams);
		if (partyId) getQuests(partyId, updatedParams);
	};

	return {
		updateQueryParams,
		clearAllParams: clearQueryParams,
		handleSearch: (search: string) => updateAndFetch({ search }),
		handleSort: (sortBy: string) => updateAndFetch({ sortBy }),
		handleDateFilter: (filterDate: string) => updateAndFetch({ filterDate }),
		handlePriorityFilter: (priority: string) => updateAndFetch({ priority }),
		handleOrder: (orderBy: string) => updateAndFetch({ orderBy }),
		handleDateRange: (startDate: string, endDate: string) =>
			updateAndFetch({ startDate, endDate }),
	};
};

export default useQueryUpdater;
