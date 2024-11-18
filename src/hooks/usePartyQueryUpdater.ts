import usePartyStore from "../stores/usePartyStore";
import { useQueryParams } from "./useQueryParams";

const usePartyQueryUpdater = () => {
	const { updateQueryParams, getSearchParams, clearQueryParams } =
		useQueryParams();
	const { getParties } = usePartyStore();

	const currentParams = getSearchParams();

	const updateAndFetch = (params: Record<string, any>) => {
		const updatedParams = { ...currentParams, ...params };
		updateQueryParams(updatedParams);
		getParties(updatedParams);
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

export default usePartyQueryUpdater;
