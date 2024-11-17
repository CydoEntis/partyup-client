export type QueryParams = {
	search?: string;
	sortBy?: string;
	filterDate?: string;
	orderBy?: string;
	pageNumber?: number;
	pageSize?: number;
	startDate?: string;
	endDate?: string;
	[key: string]: string | number | undefined;
};
