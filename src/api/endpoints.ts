export const baseUrl = import.meta.env.VITE_API_URL;

const endpoints = {
	auth: "/auth",
	user: "/user",
	avatars: "/avatars",
	parties: "/parties",
	steps: "/steps",
};

export default endpoints;
