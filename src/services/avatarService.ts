import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import { AvatarShopItem } from "../shared/types/avatar.types";

const getAvatarShop = async (userId: string): Promise<AvatarShopItem[]> => {
	const response = (await apiClient.get(`${endpoints.avatars}/${userId}`)).data;
	console.log("Response: ", response);
	if (!response.isSuccess) throw new Error();

	return response.result;
};

export default {
	getAvatarShop,
};
