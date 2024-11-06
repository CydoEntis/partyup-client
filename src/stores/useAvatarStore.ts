import { create } from "zustand";
import { AvatarShopItem } from "../shared/types/avatar.types";
import avatarService from "../services/avatarService";

type AvatarShopState = {
	avatars: AvatarShopItem[] | null;
	loading: boolean;
	error: string | null;

	getAvatarShop: (userId: string) => Promise<void>;
};

export const useAvatarStore = create<AvatarShopState>((set) => ({
	avatars: null,
	loading: true,
	error: null,

	getAvatarShop: async (userId: string) => {
		set({ loading: true, error: null });
		try {
			const avatars = await avatarService.getAvatarShop(userId);
			console.log("avatars: ", avatars);
			set({ avatars });
		} catch (error) {
			set({ error: "Failed to fetch user data" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useAvatarStore;
