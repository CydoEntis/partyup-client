import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	PaginatedQuests,
	Quest,
	CreateQuest,
} from "../shared/types/quest.types";
import { QueryParams } from "../stores/useQuestStore";

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

	console.log("Quest: ", response);

	return response.result;
};

// const updateQuestDetails = async (
// 	campaignId: number,
// 	questId: number,
// 	updatedQuestDetails: UpdateQuestDetails,
// ): Promise<Quest> => {
// 	const response = (
// 		await apiClient.put(
// 			`${endpoints.campaigns}/${campaignId}/quests/${questId}`,
// 			updatedQuestDetails,
// 		)
// 	).data;
// 	if (!response.isSuccess) throw new Error();
// 	return response.result;
// };

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

export default {
	getAllQuests,
	getQuestById,
	createQuest,
	deleteQuest,
};
