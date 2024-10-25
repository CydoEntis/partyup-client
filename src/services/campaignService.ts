import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	Campaign,
	CreateCampaign,
	PaginatedCampaigns,
	UpdateCampaignDetails,
	UpdateCampaignLeader,
} from "../shared/types/campaign.types";
import { QueryParams } from "../shared/types/query-paramts.types";

const getAllCampaigns = async (
	params?: QueryParams,
): Promise<PaginatedCampaigns> => {
	const queryParams = new URLSearchParams();

	if (params) {
		if (params.searchValue)
			queryParams.append("searchValue", params.searchValue);
		if (params.orderOn) queryParams.append("orderOn", params.orderOn);
		if (params.orderBy) queryParams.append("orderBy", params.orderBy);
		if (params.pageNumber)
			queryParams.append("pageNumber", params.pageNumber.toString());
		if (params.pageSize)
			queryParams.append("pageSize", params.pageSize.toString());
	}

	console.log("Constructed query params: ", queryParams);

	const response = (
		await apiClient.get(`${endpoints.campaigns}?${queryParams.toString()}`)
	).data;

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getCampaignById = async (campaignId: number): Promise<Campaign> => {
	const response = (await apiClient.get(`${endpoints.campaigns}/${campaignId}`))
		.data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createCampaign = async (campaign: CreateCampaign): Promise<Campaign> => {
	const response = (await apiClient.post(`${endpoints.campaigns}`, campaign))
		.data;
	if (!response.isSuccess) throw new Error();

	console.log("Campaign: ", response);

	return response.result;
};

const updateCampaignDetails = async (
	campaignId: number,
	updatedCampaignDetails: UpdateCampaignDetails,
): Promise<Campaign> => {
	const response = (
		await apiClient.put(
			`${endpoints.campaigns}/${campaignId}/details`,
			updatedCampaignDetails,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const updateCampaignLeader = async (
	campaignId: number,
	newCampaignLeader: UpdateCampaignLeader,
): Promise<UpdateCampaignLeader> => {
	const response = (
		await apiClient.put(
			`${endpoints.campaigns}/${campaignId}/leader`,
			newCampaignLeader,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const deleteCampaign = async (campaignId: number): Promise<void> => {
	const response = (
		await apiClient.delete(`${endpoints.campaigns}/${campaignId}`)
	).data;
	if (!response.isSuccess) throw new Error();
};

export default {
	getAllCampaigns,
	getCampaignById,
	createCampaign,
	updateCampaignDetails,
	updateCampaignLeader,
	deleteCampaign,
};
