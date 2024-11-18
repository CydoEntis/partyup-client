import { useQueryParams } from "./useQueryParams";

type UseQueryUpdaterOptions = {
	fetchCallback: (params: Record<string, any>) => void; // Function to fetch data
};

const useQueryUpdater = ({ fetchCallback }: UseQueryUpdaterOptions) => {
	const {
		updateQueryParams,
		getSearchParams,
		clearAllFilterParams,
		clearSearchParam,
	} = useQueryParams();

	const currentParams = getSearchParams();

	const updateAndFetch = (params: Record<string, any>) => {
		const updatedParams = { ...currentParams, ...params };
		updateQueryParams(updatedParams);
		fetchCallback(updatedParams);
	};

	const applyFilters = (filters: Record<string, any>) => {
		const { search, ...otherFilters } = filters;
		const updatedParams = { ...currentParams, ...otherFilters };
		updateQueryParams(updatedParams);
		fetchCallback(updatedParams);
	};

	const handleSearch = (search: string) => {
		const updatedParams = { ...currentParams, search };
		updateQueryParams(updatedParams);
		fetchCallback(updatedParams);
	};

	return {
		updateQueryParams,
		clearAllFilterParams,
		clearSearchParam,
		applyFilters,
		handleSearch,
		updateAndFetch,
	};
};

export default useQueryUpdater;
