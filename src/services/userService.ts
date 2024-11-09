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

export default {
	getUser,
	updateAvatar,
};
