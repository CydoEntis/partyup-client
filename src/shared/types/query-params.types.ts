export type QueryParams = {
	search?: string;
	filter?: string;
	orderBy?: string;
	pageNumber?: number;
	pageSize?: number;
	startDate?: string;
	endDate?: string;
	[key: string]: string | number | undefined;
};
