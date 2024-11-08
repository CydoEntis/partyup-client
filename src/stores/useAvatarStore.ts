import { create } from "zustand";
import { Avatar } from "../shared/types/avatar.types";
import avatarService from "../services/avatarService";

type AvatarShopState = {
	avatars: Avatar[] | null;
	unlockedAvatars: Avatar[] | null;
	nextUnlockableTierOfAvatars: Avatar[] | null;
	loading: {
		list: boolean;
		unlocked: boolean;
		nextTier: boolean;
	};
	error: string | null;

	getAvatarShop: () => Promise<void>;
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
	},
	error: null,

	getAvatarShop: async () => {
		set((state) => ({
			loading: { ...state.loading, list: true },
			error: null,
		}));
		try {
			const avatars = await avatarService.getAvatarShop();
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

	getUnlockedAvatars: async () => {
		set((state) => ({
			loading: { ...state.loading, unlocked: true },
			error: null,
		}));
		try {
			const unlockedAvatars = await avatarService.getUnlockedAvatars();
			set({ unlockedAvatars });
		} catch (error) {
			set({ error: "Failed to fetch user data" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, unlocked: false },
				error: null,
			}));
		}
	},

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
			set({ error: "Failed to fetch user data" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, nextTier: false },
				error: null,
			}));
		}
	},

	unlockAvatar: async (avatarId: number) => {
		set((state) => ({
			loading: { ...state.loading, unlock: true },
			error: null,
		}));
		try {
			// Unlock the avatar using the service
			const unlockedAvatar = await avatarService.unlockAvatar(avatarId);

			set((state) => {
				const updatedAvatars = state.avatars?.map((avatar) =>
					avatar.id === avatarId ? { ...avatar, isUnlocked: true } : avatar,
				);

				const updatedUnlockedAvatars = state.unlockedAvatars
					? [...state.unlockedAvatars, unlockedAvatar] // Add the unlocked avatar to the existing array
					: [unlockedAvatar]; // If no unlocked avatars, initialize with the unlocked avatar

				// Update the next unlockable tier (remove the unlocked avatar)
				const updatedNextUnlockableTier =
					state.nextUnlockableTierOfAvatars?.filter(
						(avatar) => avatar.id !== avatarId,
					);

				return {
					avatars: updatedAvatars,
					unlockedAvatars: updatedUnlockedAvatars, // Ensure it's an array of Avatar objects (Avatar[])
					nextUnlockableTierOfAvatars: updatedNextUnlockableTier,
				};
			});
		} catch (error) {
			set({ error: "Failed to unlock avatar" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, unlock: false },
				error: null,
			}));
		}
	},
}));

export default useAvatarStore;
