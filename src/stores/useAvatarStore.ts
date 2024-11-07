import { create } from "zustand";
import { AvatarShopItem } from "../shared/types/avatar.types";
import avatarService from "../services/avatarService";

type AvatarShopState = {
	avatars: AvatarShopItem[] | null;
	loading: {
		list: boolean;
	};
	error: string | null;

	getAvatarShop: (userId: string) => Promise<void>;
};

export const useAvatarStore = create<AvatarShopState>((set) => ({
	avatars: null,
	loading: {
		list: false,
	},
	error: null,

	getAvatarShop: async (userId: string) => {
		set((state) => ({
			loading: { ...state.loading, list: true },
			error: null,
		}));
		try {
			const avatars = await avatarService.getAvatarShop(userId);
			console.log("avatars: ", avatars);
			set({ avatars });
		} catch (error) {
			set({ error: "Failed to fetch user data" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, list: false },
				error: null,
			}));
		}
	},
}));

export default useAvatarStore;
