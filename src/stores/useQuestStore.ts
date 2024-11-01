import { create } from "zustand";
import questService from "../services/questService";
import {
	PaginatedQuests,
	Quest,
	CreateQuest,
	UpdateQuest,
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
		campaignId: string,
		params?: QueryParams,
	) => Promise<PaginatedQuests>;
	getQuest: (campaignId: string, questId: string) => Promise<Quest>;
	createQuest: (campaignId: string, quest: CreateQuest) => Promise<Quest>;
	updateQuest: (
		campaignId: string,
		questId: string,
		updatedDetails: UpdateQuest,
	) => Promise<Quest>;
	deleteQuest: (campaignId: string, id: string) => Promise<void>;
};

export const useQuestStore = create<QuestState>((set) => ({
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

	getQuests: async (campaignId: string, params?: QueryParams) => {
		set({ loading: true, error: null });
		try {
			const paginatedQuests = await questService.getAllQuests(
				Number(campaignId),
				params,
			);

			set({ paginatedQuests, loading: false });
			return paginatedQuests;
		} catch (error) {
			set({ error: "Failed to fetch quests", loading: false });
			throw error;
		}
	},

	getQuest: async (campaignId: string, questId: string) => {
		set({ loading: true, error: null });
		try {
			const quest = await questService.getQuestById(+campaignId, +questId);
			set({ quest, loading: false });
			return quest;
		} catch (error) {
			set({ error: "Failed to fetch quest", loading: false });
			throw error;
		}
	},

	createQuest: async (
		campaignId: string,
		quest: CreateQuest,
	): Promise<Quest> => {
		set({ loading: true, error: null });
		try {
			const newQuest = await questService.createQuest(
				Number(campaignId),
				quest,
			);

			console.log("New Quest:", newQuest);

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
				quest: newQuest,
				loading: false,
				error: null,
			}));

			return newQuest;
		} catch (error) {
			set({ error: "Failed to create quest", loading: false });
			throw error;
		}
	},

	updateQuest: async (
		campaignId: string,
		questId: string,
		updatedDetails: UpdateQuest,
	): Promise<Quest> => {
		set({ loading: true, error: null });
		try {
			const updatedQuest = await questService.updateQuest(
				Number(campaignId),
				Number(questId),
				updatedDetails,
			);

			console.log(updatedQuest);

			set((state) => ({
				paginatedQuests: {
					...state.paginatedQuests,
					items: state.paginatedQuests.items.map((quest) =>
						quest.id === Number(questId)
							? {
									...quest,
									...updatedQuest,
									dueDate: new Date(updatedQuest.dueDate),
							  }
							: quest,
					),
				},
				quest:
					state.quest?.id === Number(questId)
						? { ...state.quest, ...updatedQuest }
						: state.quest,
				loading: false,
			}));

			return updatedQuest;
		} catch (error) {
			set({ error: "Failed to update quest", loading: false });
			throw error;
		}
	},

	deleteQuest: async (campaignId: string, questId: string) => {
		set({ loading: true, error: null });
		try {
			await questService.deleteQuest(+campaignId, +questId);
			set((state) => ({
				paginatedQuests: {
					...state.paginatedQuests!,
					items:
						state.paginatedQuests?.items.filter(
							(quest) => quest.id !== +questId,
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
