import { useQueryParams } from "./useQueryParams";
import usePartyStore from "../stores/usePartyStore";

const usePartyQueryUpdater = () => {
	const {
		updateQueryParams,
		getSearchParams,
		clearAllFilterParams,
		clearSearchParam,
	} = useQueryParams();
	const { getParties } = usePartyStore();

	const currentParams = getSearchParams();

	const updateAndFetch = (params: Record<string, any>) => {
		const updatedParams = { ...currentParams, ...params };
		updateQueryParams(updatedParams);
		getParties(updatedParams);
	};

	const applyFilters = (filters: Record<string, any>) => {
		const { search, ...otherFilters } = filters;
		updateQueryParams({ ...currentParams, ...otherFilters });
		getParties({ ...currentParams, ...otherFilters });
	};

	const handleSearch = (search: string) => {
		updateQueryParams({ ...currentParams, search });
		getParties({ ...currentParams, search });
	};

	return {
		updateQueryParams,
		clearAllFilterParams,
		clearSearchParam,
		applyFilters,
		handleSearch,
	};
};

export default usePartyQueryUpdater;
