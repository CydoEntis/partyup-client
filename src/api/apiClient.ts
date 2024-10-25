import axios from "axios";
import useAuthStore from "../stores/useAuthStore";
import { baseUrl } from "./endpoints";


const apiClient = axios.create({
	baseURL: baseUrl,
});

apiClient.interceptors.request.use(
	(request) => {
		const { user } = useAuthStore.getState();
		if (user && user.tokens) {
			request.headers["Authorization"] = `Bearer ${user.tokens.accessToken}`;
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const { user, refreshTokens, logout } = useAuthStore.getState();
			try {
				if (user && user.tokens) {
					const { tokens } = user;
					const newTokens = await refreshTokens(tokens);

					originalRequest.headers[
						"Authorization"
					] = `Bearer ${newTokens.accessToken}`;
					return apiClient(originalRequest);
				}
			} catch (refreshError) {
				console.log("Refresh error?");
				if (user) {
					logout();
					window.location.href = "/auth/login";
				}

				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default apiClient;
