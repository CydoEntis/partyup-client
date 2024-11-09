import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import { Avatar } from "../shared/types/avatar.types";

const getAvatars = async (): Promise<Avatar[]> => {
	const response = (await apiClient.get(`${endpoints.avatars}`)).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const getUnlockedAvatars = async (): Promise<Avatar[]> => {
	const response = (await apiClient.get(`${endpoints.avatars}/unlocked`)).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const getNextTierOfAvatars = async (): Promise<Avatar[]> => {
	const response = (await apiClient.get(`${endpoints.avatars}/next-tier`)).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const unlockAvatar = async (avatarId: number): Promise<Avatar> => {
	const response = (
		await apiClient.post(`${endpoints.avatars}/unlock`, avatarId)
	).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();

	return response.result;
};



export default {
	getAvatars,
	getUnlockedAvatars,
	getNextTierOfAvatars,
	unlockAvatar,
};
