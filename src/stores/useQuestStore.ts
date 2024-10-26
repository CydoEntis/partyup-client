import { create } from "zustand";
import questService from "../services/questService";
import {
	PaginatedQuests,
	Quest,
	CreateQuest,
} from "../shared/types/quest.types";

export type QueryParams = {
	searchValue?: string;
	orderBy?: string;
	orderOn?: string;
	pageNumber?: number;
	pageSize?: number;
};

type QuestState = {
	paginatedQuests: PaginatedQuests;
	quest: Quest | null;
	loading: boolean;
	error: string | null;
	getQuests: (
		campaignId: number,
		params?: QueryParams,
	) => Promise<PaginatedQuests>;
	getQuest: (campaignId: number, id: number) => Promise<Quest>;
	createQuest: (campaignId: number, quest: CreateQuest) => Promise<Quest>;
	deleteQuest: (campaignId: number, id: number) => Promise<void>;
};

export const useQuestStore = create<QuestState>((set, get) => ({
	paginatedQuests: {
		items: [],
		totalCount: 0,
		totalPages: 0,
		currentPage: 1,
		hasNextPage: false,
		hasPreviousPage: false,
		pageRange: [],
	},
	quest: null,
	loading: false,
	error: null,

	getQuests: async (campaignId: number, params?: QueryParams) => {
		set({ loading: true, error: null });
		const paginatedQuestsState = get().paginatedQuests;
		const currentQuests = get().paginatedQuests?.items[campaignId];

		if (currentQuests && !params) {
			set({ loading: false });
			return paginatedQuestsState;
		}

		try {
			const paginatedQuests = await questService.getAllQuests(
				campaignId,
				params,
			);

			set({ paginatedQuests, loading: false });
			return paginatedQuests;
		} catch (error) {
			set({ error: "Failed to fetch quests", loading: false });
			throw error;
		}
	},

	getQuest: async (campaignId: number, questId: number) => {
		set({ loading: true, error: null });
		try {
			const quest = await questService.getQuestById(campaignId, questId);
			console.log("Quest: ", quest);
			set({ quest, loading: false });
			return quest;
		} catch (error) {
			set({ error: "Failed to fetch quest", loading: false });
			throw error;
		}
	},

	createQuest: async (
		campaignId: number,
		quest: CreateQuest,
	): Promise<Quest> => {
		set({ loading: true, error: null });
		try {
			const newQuest = await questService.createQuest(campaignId, quest);
			set((state) => ({
				paginatedQuests: state.paginatedQuests
					? {
							...state.paginatedQuests,
							items: [newQuest, ...state.paginatedQuests.items],
							totalCount: state.paginatedQuests.totalCount + 1,
					  }
					: {
							items: [newQuest],
							totalCount: 1,
							totalPages: 1,
							currentPage: 1,
							hasNextPage: false,
							hasPreviousPage: false,
							pageRange: [],
					  },
				loading: false,
			}));
			return newQuest;
		} catch (error) {
			set({ error: "Failed to create quest", loading: false });
			throw error;
		}
	},

	deleteQuest: async (campaignId: number, questId: number) => {
		set({ loading: true, error: null });
		try {
			await questService.deleteQuest(campaignId, questId);
			set((state) => ({
				paginatedQuests: {
					...state.paginatedQuests!,
					items:
						state.paginatedQuests?.items.filter(
							(quest) => quest.id !== questId,
						) || [],
					totalCount: (state.paginatedQuests?.totalCount || 0) - 1,
				},
				loading: false,
			}));
		} catch (error) {
			set({ error: "Failed to delete quest", loading: false });
			throw error;
		}
	},
}));

export default useQuestStore;
