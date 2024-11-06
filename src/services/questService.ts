import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import { QueryParams } from "../shared/types/query-params.types";
import {
	PaginatedQuests,
	Quest,
	CreateQuest,
	UpdateQuest,
} from "../shared/types/quest.types";

const getAllQuests = async (
	campaignId: number,
	params?: QueryParams,
): Promise<PaginatedQuests> => {
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

	const response = (
		await apiClient.get(
			`${endpoints.campaigns}/${campaignId}/quests?${queryParams.toString()}`,
		)
	).data;

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getQuestById = async (
	campaignId: number,
	questId: number,
): Promise<Quest> => {
	const response = (
		await apiClient.get(
			`${endpoints.campaigns}/${campaignId}/quests/${questId}`,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createQuest = async (
	campaignId: number,
	quest: CreateQuest,
): Promise<Quest> => {
	const response = (
		await apiClient.post(`${endpoints.campaigns}/${campaignId}/quests`, quest)
	).data;
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const updateQuest = async (
	campaignId: number,
	questId: number,
	updatedQuest: UpdateQuest,
): Promise<Quest> => {
	const response = (
		await apiClient.put(
			`${endpoints.campaigns}/${campaignId}/quests/${questId}`,
			updatedQuest,
		)
	).data;
	if (!response.isSuccess) throw new Error();

	console.log("Updated quest response: ", response);

	return response.result;
};

const deleteQuest = async (
	campaignId: number,
	questId: number,
): Promise<void> => {
	const response = (
		await apiClient.delete(
			`${endpoints.campaigns}/${campaignId}/quests/${questId}`,
		)
	).data;
	if (!response.isSuccess) throw new Error();
};

const completeQuest = async (
	campaignId: number,
	questId: number,
): Promise<Quest> => {
	const response = (
		await apiClient.post(
			`${endpoints.campaigns}/${campaignId}/quests/${questId}/complete`,
		)
	).data;
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const uncompleteQuest = async (
	campaignId: number,
	questId: number,
): Promise<Quest> => {
	const response = (
		await apiClient.put(
			`${endpoints.campaigns}/${campaignId}/quests/${questId}/uncomplete`,
		)
	).data;
	if (!response.isSuccess) throw new Error();


	return response.result;
};

export default {
	getAllQuests,
	getQuestById,
	createQuest,
	updateQuest,
	deleteQuest,
	completeQuest,
	uncompleteQuest,
};
