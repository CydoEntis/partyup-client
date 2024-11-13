import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import { User } from "../shared/types/auth.types";
import { Avatar } from "../shared/types/avatar.types";

const getUser = async (userId: string): Promise<User> => {
	const response = (await apiClient.get(`${endpoints.user}/${userId}`)).data;

	if (!response.isSuccess) throw new Error();

	return response.result;
};

const updateAvatar = async (avatarId: number): Promise<Avatar> => {
	console.log(avatarId);

	const response = (
		await apiClient.put(`${endpoints.user}/avatar`, { id: avatarId })
	).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();

	return response.result;
};

const updateDisplayName = async (displayName: string): Promise<void> => {
	const response = (
		await apiClient.put(`${endpoints.user}/display-name`, { displayName })
	).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();
};

const getUserStats = async (): Promise<void> => {
	const response = (await apiClient.get(`${endpoints.user}/stats`)).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();
};

export default {
	getUser,
	updateDisplayName,
	updateAvatar,
	getUserStats,
};
