export const baseUrl = import.meta.env.VITE_API_URL;

const endpoints = {
	auth: "/auth",
	user: "/user",
	campaigns: "/campaigns",
	steps: "/steps",
};

export default endpoints;
