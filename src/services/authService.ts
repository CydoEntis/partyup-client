import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	LoginCredentials,
	RegisterCredentials,
	Tokens,
	User,
} from "../shared/types/auth.types";

const registerUser = async (
	credentials: RegisterCredentials,
): Promise<User> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/register`, credentials)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const loginUser = async (credentials: LoginCredentials): Promise<User> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/login`, credentials)
	).data;

	if (!response.isSuccess) throw new Error();

	return response.result.data;
};

const logoutUser = async (tokens: Tokens): Promise<boolean> => {
	const response = (await apiClient.post(`${endpoints.auth}/revoke`, tokens))
		.data;
	if (!response.isSuccess) throw new Error();

	return response.isSuccess;
};

const refreshTokens = async (tokens: Tokens): Promise<Tokens> => {
	const response = (await apiClient.post(`${endpoints.auth}/refresh`, tokens))
		.data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};



export default { registerUser, loginUser, logoutUser, refreshTokens };
