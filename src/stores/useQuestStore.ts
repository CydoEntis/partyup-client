import { create } from "zustand";
import questService from "../services/questService";
import {
	PaginatedQuests,
	Quest,
	CreateQuest,
	UpdateQuest,
} from "../shared/types/quest.types";
import { UpdateStep } from "../shared/types/step.types";
import stepService from "../services/stepService";
import { QueryParams } from "../shared/types/query-params.types";
import { useAuthStore } from "./useAuthStore";

type QuestState = {
	paginatedQuests: PaginatedQuests;
	quest: Quest | null;
	loading: boolean;
	error: string | null;
	getQuests: (
		partyId: string,
		params?: QueryParams,
	) => Promise<PaginatedQuests>;
	getQuest: (partyId: string, questId: string) => Promise<Quest>;
	createQuest: (partyId: string, quest: CreateQuest) => Promise<Quest>;
	updateQuest: (
		partyId: string,
		questId: string,
		updatedDetails: UpdateQuest,
	) => Promise<Quest>;
	deleteQuest: (partyId: string, id: string) => Promise<void>;
	updateStep: (
		questId: string,
		stepId: number,
		updatedStepDetails: UpdateStep,
	) => Promise<void>;
	completeQuest: (partyId: number, questId: number) => Promise<void>;
	uncompleteQuest: (partyId: number, questId: number) => Promise<void>;
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

	getQuests: async (partyId: string, params?: QueryParams) => {
		set({ loading: true, error: null });
		try {
			const paginatedQuests = await questService.getAllQuests(
				Number(partyId),
				params,
			);
			set({ paginatedQuests });
			return paginatedQuests;
		} catch (error) {
			set({ error: "Failed to fetch quests" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getQuest: async (partyId: string, questId: string) => {
		set({ loading: true, error: null });
		try {
			const quest = await questService.getQuestById(+partyId, +questId);
			set({ quest });
			return quest;
		} catch (error) {
			set({ error: "Failed to fetch quest" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	createQuest: async (partyId: string, quest: CreateQuest): Promise<Quest> => {
		set({ loading: true, error: null });
		try {
			const newQuest = await questService.createQuest(Number(partyId), quest);
			set((state) => ({
				paginatedQuests: {
					...state.paginatedQuests,
					items: [newQuest, ...state.paginatedQuests.items],
					totalCount: state.paginatedQuests.totalCount + 1,
				},
				quest: newQuest,
			}));
			return newQuest;
		} catch (error) {
			set({ error: "Failed to create quest" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	updateQuest: async (
		partyId: string,
		questId: string,
		updatedDetails: UpdateQuest,
	): Promise<Quest> => {
		set({ loading: true, error: null });
		try {
			const updatedQuest = await questService.updateQuest(
				Number(partyId),
				Number(questId),
				updatedDetails,
			);

			set((state) => {
				const updatedItems = state.paginatedQuests.items.map((quest) =>
					quest.id === Number(questId)
						? {
								...quest,
								...updatedQuest,
								dueDate: new Date(updatedQuest.dueDate),
						  }
						: quest,
				);

				return {
					paginatedQuests: {
						...state.paginatedQuests,
						items: updatedItems,
					},
					quest:
						state.quest?.id === Number(questId)
							? { ...state.quest, ...updatedQuest }
							: state.quest,
				};
			});
			return updatedQuest;
		} catch (error) {
			set({ error: "Failed to update quest" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	deleteQuest: async (partyId: string, questId: string) => {
		set({ loading: true, error: null });
		try {
			await questService.deleteQuest(+partyId, +questId);
			set((state) => ({
				paginatedQuests: {
					...state.paginatedQuests,
					items: state.paginatedQuests.items.filter(
						(quest) => quest.id !== +questId,
					),
					totalCount: (state.paginatedQuests.totalCount || 0) - 1,
				},
			}));
		} catch (error) {
			set({ error: "Failed to delete quest" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	updateStep: async (
		questId: string,
		stepId: number,
		updatedStepDetails: UpdateStep,
	) => {
		try {
			const updatedStep = await stepService.updateStep(updatedStepDetails);

			set((state) => {
				const paginatedQuests = state.paginatedQuests.items;

				const updatedQuests = paginatedQuests.map((quest) => {
					if (quest.id === Number(questId)) {
						const updatedSteps = quest.steps.map((step) =>
							step.id === stepId ? { ...step, ...updatedStep } : step,
						);

						const completedStepsCount = updatedSteps.filter(
							(step) => step.isCompleted,
						).length;

						return {
							...quest,
							steps: updatedSteps,
							completedSteps: completedStepsCount,
						};
					}
					return quest;
				});

				return {
					paginatedQuests: {
						...state.paginatedQuests,
						items: updatedQuests,
					},
				};
			});
		} catch (error) {
			set({ error: "Failed to update step" });
			throw error;
		}
	},

	completeQuest: async (partyId: number, questId: number) => {
		set({ loading: true, error: null });
		try {
			const completedQuest = await questService.completeQuest(partyId, questId);

			const { getUser, user } = useAuthStore.getState();
			await getUser(user!.id);

			set((state) => {
				const updatedItems = state.paginatedQuests.items.map((quest) =>
					quest.id === completedQuest.id
						? { ...quest, ...completedQuest }
						: quest,
				);

				return {
					paginatedQuests: {
						...state.paginatedQuests,
						items: updatedItems,
					},
					quest:
						state.quest?.id === completedQuest.id
							? { ...state.quest, ...completedQuest }
							: state.quest,
				};
			});
		} catch (error) {
			set({ error: "Failed to complete quest" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	uncompleteQuest: async (partyId: number, questId: number) => {
		set({ loading: true, error: null });
		try {
			const uncompletedQuest = await questService.uncompleteQuest(
				partyId,
				questId,
			);

			const { getUser, user } = useAuthStore.getState();
			await getUser(user!.id);

			set((state) => {
				const updatedItems = state.paginatedQuests.items.map((quest) =>
					quest.id === uncompletedQuest.id
						? { ...quest, ...uncompletedQuest }
						: quest,
				);

				return {
					paginatedQuests: {
						...state.paginatedQuests,
						items: updatedItems,
					},
					quest:
						state.quest?.id === uncompletedQuest.id
							? { ...state.quest, ...uncompletedQuest }
							: state.quest,
				};
			});
		} catch (error) {
			set({ error: "Failed to uncomplete quest" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useQuestStore;
