import { create } from "zustand";
import { Avatar } from "../shared/types/avatar.types";
import avatarService from "../services/avatarService";

type AvatarShopState = {
	avatars: Avatar[] | null;
	unlockedAvatars: Avatar[] | null; // Array of unlocked avatars
	nextUnlockableTierOfAvatars: Avatar[] | null; // Array for next tier avatars
	loading: {
		list: boolean;
		unlocked: boolean;
		nextTier: boolean;
		unlock: boolean;
	};
	error: string | null;

	getAvatars: () => Promise<void>;
	getUnlockedAvatars: () => Promise<void>;
	getNextUnlockableTier: () => Promise<void>;
	unlockAvatar: (avatarId: number) => Promise<void>;
};

export const useAvatarStore = create<AvatarShopState>((set) => ({
	avatars: null,
	unlockedAvatars: null,
	nextUnlockableTierOfAvatars: null,
	loading: {
		list: false,
		unlocked: false,
		nextTier: false,
		unlock: false,
	},
	error: null,

	// Fetch all avatars for the shop
	getAvatars: async () => {
		set((state) => ({
			loading: { ...state.loading, list: true },
			error: null,
		}));
		try {
			const avatars = await avatarService.getAvatars();
			set({ avatars });
		} catch (error) {
			set({ error: "Failed to fetch avatars" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, list: false },
			}));
		}
	},

	// Fetch all unlocked avatars
	getUnlockedAvatars: async () => {
		set((state) => ({
			loading: { ...state.loading, unlocked: true },
			error: null,
		}));
		try {
			const unlockedAvatars = await avatarService.getUnlockedAvatars();
			set({ unlockedAvatars });
		} catch (error) {
			set({ error: "Failed to fetch unlocked avatars" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, unlocked: false },
			}));
		}
	},

	// Fetch next unlockable tier avatars
	getNextUnlockableTier: async () => {
		set((state) => ({
			loading: { ...state.loading, nextTier: true },
			error: null,
		}));
		try {
			const nextUnlockableTierOfAvatars =
				await avatarService.getNextTierOfAvatars();
			set({ nextUnlockableTierOfAvatars });
		} catch (error) {
			set({ error: "Failed to fetch next unlockable tier" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, nextTier: false },
			}));
		}
	},

	unlockAvatar: async (avatarId: number) => {
		set((state) => ({
			loading: { ...state.loading, unlock: true },
			error: null,
		}));
		try {
			const unlockedAvatar = await avatarService.unlockAvatar(avatarId);

			set((state) => {
				const updatedAvatars = state.avatars?.map((avatar) =>
					avatar.id === avatarId ? { ...avatar, isUnlocked: true } : avatar,
				);

				const updatedUnlockedAvatars = state.unlockedAvatars
					? [...state.unlockedAvatars, unlockedAvatar]
					: [unlockedAvatar];

				const updatedNextUnlockableTier =
					state.nextUnlockableTierOfAvatars?.filter(
						(avatar) => avatar.id !== avatarId,
					);

				return {
					avatars: updatedAvatars,
					unlockedAvatars: updatedUnlockedAvatars,
					nextUnlockableTierOfAvatars: updatedNextUnlockableTier,
				};
			});
		} catch (error) {
			set({ error: "Failed to unlock avatar" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, unlock: false },
			}));
		}
	},
}));

export default useAvatarStore;
