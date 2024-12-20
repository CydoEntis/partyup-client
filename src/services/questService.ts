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
	partyId: number,
	params?: QueryParams,
): Promise<PaginatedQuests> => {
	const queryParams = new URLSearchParams();

	Object.entries(params || {}).forEach(([key, value]) => {
		if (value) queryParams.append(key, value.toString());
	});

	const response = (
		await apiClient.get(
			`${endpoints.parties}/${partyId}/quests?${queryParams.toString()}`,
		)
	).data;

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getQuestById = async (
	partyId: number,
	questId: number,
): Promise<Quest> => {
	const response = (
		await apiClient.get(`${endpoints.parties}/${partyId}/quests/${questId}`)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createQuest = async (
	partyId: number,
	quest: CreateQuest,
): Promise<Quest> => {
	const response = (
		await apiClient.post(`${endpoints.parties}/${partyId}/quests`, quest)
	).data;
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const updateQuest = async (
	partyId: number,
	questId: number,
	updatedQuest: UpdateQuest,
): Promise<Quest> => {
	const response = (
		await apiClient.put(
			`${endpoints.parties}/${partyId}/quests/${questId}`,
			updatedQuest,
		)
	).data;

	console.log(response);

	if (!response.isSuccess) throw new Error();

	return response.result;
};

const deleteQuest = async (partyId: number, questId: number): Promise<void> => {
	const response = (
		await apiClient.delete(`${endpoints.parties}/${partyId}/quests/${questId}`)
	).data;
	if (!response.isSuccess) throw new Error();
};

const completeQuest = async (
	partyId: number,
	questId: number,
): Promise<Quest> => {
	const response = (
		await apiClient.post(
			`${endpoints.parties}/${partyId}/quests/${questId}/complete`,
		)
	).data;
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const uncompleteQuest = async (
	partyId: number,
	questId: number,
): Promise<Quest> => {
	const response = (
		await apiClient.put(
			`${endpoints.parties}/${partyId}/quests/${questId}/uncomplete`,
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
