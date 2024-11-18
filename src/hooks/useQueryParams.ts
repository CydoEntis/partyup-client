import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../shared/types/query-params.types";

export const useQueryParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const updateQueryParams = (newParams: QueryParams) => {
		// Preserve the existing search value
		const currentSearch = searchParams.get("search");

		// Create a new URLSearchParams object and apply the new params
		const updatedParams = new URLSearchParams(searchParams);

		Object.keys(newParams).forEach((key) => {
			const value = newParams[key];
			if (value !== undefined && value !== null && value !== "") {
				updatedParams.set(key, value.toString());
			} else {
				updatedParams.delete(key);
			}
		});

		// Re-set the search parameter to the previous value (if it's not being updated)
		if (currentSearch && !newParams.search) {
			updatedParams.set("search", currentSearch);
		}

		// Update the query parameters without clearing the search term
		setSearchParams(updatedParams);
	};

	const getQueryParam = (key: string) => {
		return searchParams.get(key) || undefined;
	};

	const getSearchParams = (): QueryParams => {
		const search = getQueryParam("search");
		const sortBy = getQueryParam("sortBy");
		const filterDate = getQueryParam("filterDate");
		const orderBy = getQueryParam("orderBy");
		const pageNumber = getQueryParam("pageNumber");
		const pageSize = getQueryParam("pageSize");
		const startDate = getQueryParam("startDate");
		const endDate = getQueryParam("endDate");
		const priority = getQueryParam("priority");

		return {
			search,
			sortBy,
			filterDate,
			orderBy,
			pageNumber: pageNumber ? Number(pageNumber) : 1,
			pageSize: pageSize ? Number(pageSize) : 24,
			startDate,
			endDate,
			priority,
		};
	};

	const clearAllFilterParams = () => {
		const { search } = Object.fromEntries(searchParams.entries());
		setSearchParams({ search: search || "" });
	};

	const clearSearchParam = () => {
		const updatedParams = new URLSearchParams(searchParams);
		updatedParams.delete("search");
		setSearchParams(updatedParams);
	};

	return {
		updateQueryParams,
		getSearchParams,
		getQueryParam,
		clearAllFilterParams,
		clearSearchParam,
	};
};
