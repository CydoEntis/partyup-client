import { useSearchParams } from "react-router-dom";
import { QueryParams } from "../shared/types/query-params.types"; // Import the existing type

export const useQueryParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const updateQueryParams = (newParams: QueryParams) => {
		const updatedParams = new URLSearchParams(searchParams);

		Object.keys(newParams).forEach((key) => {
			const value = newParams[key];
			if (value !== undefined && value !== null && value !== "") {
				updatedParams.set(key, value.toString());
			} else {
				updatedParams.delete(key); 
			}
		});

		setSearchParams(updatedParams); 
	};

	const getQueryParam = (key: string) => {
		return searchParams.get(key) || undefined;
	};

	const getSearchParams = (): QueryParams => {
		const search = getQueryParam("search");
		const filter = getQueryParam("filter");
		const orderBy = getQueryParam("orderBy");
		const pageNumber = getQueryParam("pageNumber");
		const pageSize = getQueryParam("pageSize");
		const startDate = getQueryParam("startDate");
		const endDate = getQueryParam("endDate");

		return {
			search,
			filter,
			orderBy,
			pageNumber: pageNumber ? Number(pageNumber) : 1,
			pageSize: pageSize ? Number(pageSize) : 24,
			startDate,
			endDate,
		};
	};

	return { updateQueryParams, getSearchParams, getQueryParam };
};
