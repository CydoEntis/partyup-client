

import { create } from "zustand";
import { LoginCredentials, RegisterCredentials, Tokens, User } from "../shared/types/auth.types";
import authService from "../services/authService";
import localStorageService from "../services/localStorageService";

type AuthState = {
	user: User | null;
	loading: boolean;
	error: string | null;
	restoreSession: () => void;
	refreshTokens: (tokens: Tokens) => Promise<Tokens>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	loading: true,
	error: null,

	restoreSession: () => {
		set({ loading: true, error: null });
		const storedData = localStorageService.getItem<User>("questLog");
		if (storedData) {
			try {
				const user: User = {
					...storedData,
					isLoggedIn: true,
				};
				set({ user });
			} catch (error) {
				console.error("Error parsing stored tokens:", error);
				set({ error: "Failed to initialize authentication", loading: false });
				throw error;
			} finally {
				set({ loading: false });
			}
		} else {
			set({ loading: false });
		}
	},

	refreshTokens: async (tokens: Tokens): Promise<Tokens> => {
		set({ loading: true, error: null });
		try {
			const newTokens = await authService.refreshTokens(tokens);
			set((state) => ({
				user: state.user
					? {
							...state.user,
							tokens: newTokens,
					  }
					: null,
			}));

			return newTokens;
		} catch (error) {
			set({ loading: false });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	register: async (credentials: RegisterCredentials) => {
		set({ loading: true, error: null });
		try {
			const user = await authService.registerUser(credentials);
			localStorageService.setItem("questLog", user);
			set({ user });
		} catch (error) {
			set({ loading: false });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	login: async (credentials: LoginCredentials) => {
		set({ loading: true, error: null });
		try {
			const fetchedUser = await authService.loginUser(credentials);

			const user: User = {
				...fetchedUser,
				isLoggedIn: true,
			};

			set({ user });
			localStorageService.setItem("questLog", user);
			set({ user });
		} catch (error) {
			set({ loading: false });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	logout: async () => {
		set({ loading: true });
		try {
			const user = get().user;
			if (user) {
				await authService.logoutUser(user.tokens);
				localStorageService.removeItem("questLog");
				set({ user: null });
			}
		} catch (error) {
			throw error;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useAuthStore;