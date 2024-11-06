import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import { User } from "../shared/types/auth.types";

const getUser = async (userId: string): Promise<User> => {
	const response = (await apiClient.get(`${endpoints.user}/${userId}`)).data;


	if (!response.isSuccess) throw new Error();

	return response.result;
};

export default {
	getUser,
};
