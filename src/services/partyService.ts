import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	Party,
	CreateParty,
	PaginatedParties,
	UpdateParty,
	UpdatePartyLeader,
} from "../shared/types/party.types";
import { QueryParams } from "../shared/types/query-params.types";

const getAllParties = async (
	params?: QueryParams,
): Promise<PaginatedParties> => {
	const queryParams = new URLSearchParams();

	if (params) {
		if (params.search)
			queryParams.append("search", params.search);
		if (params.orderBy) queryParams.append("orderBy", params.orderBy);
		if (params.filter) queryParams.append("filter", params.filter);
		if (params.pageNumber)
			queryParams.append("pageNumber", params.pageNumber.toString());
		if (params.pageSize)
			queryParams.append("pageSize", params.pageSize.toString());
	}

	const response = (
		await apiClient.get(`${endpoints.parties}?${queryParams.toString()}`)
	).data;

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getPartyById = async (partyId: number): Promise<Party> => {
	const response = (await apiClient.get(`${endpoints.parties}/${partyId}`))
		.data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createParty = async (party: CreateParty): Promise<Party> => {
	const response = (await apiClient.post(`${endpoints.parties}`, party))
		.data;
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const updateParty = async (
	partyId: number,
	updatedPartyDetails: UpdateParty,
): Promise<Party> => {
	const response = (
		await apiClient.put(
			`${endpoints.parties}/${partyId}/details`,
			updatedPartyDetails,
		)
	).data;
	if (!response.isSuccess) throw new Error();

	console.log(response.result);

	return response.result;
};

const updatePartyLeader = async (
	partyId: number,
	newPartyLeader: UpdatePartyLeader,
): Promise<UpdatePartyLeader> => {
	const response = (
		await apiClient.put(
			`${endpoints.parties}/${partyId}/leader`,
			newPartyLeader,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const deleteParty = async (partyId: number): Promise<void> => {
	const response = (
		await apiClient.delete(`${endpoints.parties}/${partyId}`)
	).data;
	if (!response.isSuccess) throw new Error();
};

export default {
	getAllParties,
	getPartyById,
	createParty,
	updateParty,
	updatePartyLeader,
	deleteParty,
};
