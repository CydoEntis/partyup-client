import { create } from "zustand";
import {
	Party,
	CreateParty,
	PaginatedParties,
	UpdateParty,
	NewPartyCreator,
} from "../shared/types/party.types";
import partyService from "../services/partyService";
import { QueryParams } from "../shared/types/query-params.types";
import { MembersToRemove } from "../shared/types/member.types";

type PartyState = {
	recentParties: Party[];
	parties: PaginatedParties | null;
	party: Party | null;
	loading: {
		recent: boolean;
		list: boolean;
		detail: boolean;
		create: boolean;
		update: boolean;
		delete: boolean;
	};
	error: string | null;
	getRecentParties: () => Promise<void>;
	getParties: (params?: QueryParams) => Promise<PaginatedParties>;
	getParty: (id: string) => Promise<Party>;
	createParty: (party: CreateParty) => Promise<Party>;
	updateParty: (partyId: string, updatedDetails: UpdateParty) => Promise<void>;
	deleteParty: (id: string) => Promise<void>;
	changePartyCreator: (newPartyCreator: NewPartyCreator) => Promise<void>;
	deleteMembersFromParty: (membersToRemove: MembersToRemove) => Promise<void>;
};

export const usePartyStore = create<PartyState>((set, get) => ({
	recentParties: [],
	parties: null,
	party: null,
	loading: {
		recent: false,
		list: false,
		detail: false,
		create: false,
		update: false,
		delete: false,
	},
	error: null,

	getRecentParties: async () => {
		set((state) => ({
			loading: { ...state.loading, recent: true },
			error: null,
		}));
		try {
			const queryParams = {
				orderOn: "updatedAt",
				pageSize: 5,
			};
			const parties = await partyService.getAllParties(queryParams);
			set({ recentParties: parties.items });
		} catch (error) {
			set({ error: "Failed to fetch parties" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, recent: false } }));
		}
	},

	getParties: async (params?: QueryParams) => {
		set((state) => ({
			loading: { ...state.loading, list: true },
			error: null,
		}));
		try {
			const parties = await partyService.getAllParties(params);

			console.log(parties);

			set({ parties });
			return parties;
		} catch (error) {
			set({ error: "Failed to fetch parties" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, list: false } }));
		}
	},

	getParty: async (partyId: string) => {
		const parties: Party[] | undefined = get().parties?.items;

		const existingParty = parties?.find((party) => party.id === +partyId);
		if (existingParty) {
			set({ party: existingParty });
			return existingParty;
		}

		set((state) => ({
			loading: { ...state.loading, detail: true },
			error: null,
		}));
		try {
			const party = await partyService.getPartyById(+partyId);
			set({ party });
			return party;
		} catch (error) {
			set({ error: "Failed to fetch party" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, detail: false } }));
		}
	},

	createParty: async (party: CreateParty): Promise<Party> => {
		set((state) => ({
			loading: { ...state.loading, create: true },
			error: null,
		}));
		try {
			const newParty = await partyService.createParty(party);

			set((state) => {
				const updatedRecentParties = [newParty, ...state.recentParties].slice(
					0,
					5,
				);

				return {
					parties: state.parties
						? {
								...state.parties,
								items: [newParty, ...state.parties.items],
								totalCount: state.parties.totalCount + 1,
						  }
						: {
								items: [newParty],
								totalCount: 1,
								totalPages: 1,
								currentPage: 1,
								hasNextPage: false,
								hasPreviousPage: false,
								pageRange: [],
						  },
					recentParties: updatedRecentParties,
					party: newParty,
				};
			});

			return newParty;
		} catch (error) {
			set({ error: "Failed to create party" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, create: false } }));
		}
	},

	updateParty: async (
		partyId: string,
		updatedDetails: UpdateParty,
	): Promise<void> => {
		set((state) => ({
			loading: { ...state.loading, update: true },
			error: null,
		}));
		try {
			const updatedParty = await partyService.updateParty(
				Number(partyId),
				updatedDetails,
			);

			const currentItems = get().parties?.items || [];
			const updatedParties = currentItems.map((party) =>
				party.id === Number(partyId)
					? {
							...party,
							...updatedParty,
							members: party.members,
					  }
					: party,
			);

			const updatedRecentParties = get().recentParties.map((party) =>
				party.id === Number(partyId)
					? {
							...party,
							...updatedParty,
					  }
					: party,
			);

			set((state) => ({
				party: {
					...state.party,
					...updatedParty,
					members: state.party?.members || [],
				},
				parties: {
					...state.parties!,
					items: updatedParties,
				},
				recentParties: updatedRecentParties,
			}));
		} catch (error) {
			set({ error: "Failed to update party details" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, update: false } }));
		}
	},

	deleteParty: async (partyId: string) => {
		set((state) => ({
			loading: { ...state.loading, delete: true },
			error: null,
		}));
		try {
			await partyService.deleteParty(+partyId);

			set((state) => {
				const filteredParties =
					state.parties?.items.filter((party) => party.id !== +partyId) || [];
				const updatedRecentParties = state.recentParties.filter(
					(party) => party.id !== +partyId,
				);

				return {
					parties: {
						...state.parties!,
						items: filteredParties,
						totalCount: filteredParties.length,
					},
					recentParties: updatedRecentParties,
				};
			});
		} catch (error) {
			set({ error: "Failed to delete party" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, delete: false } }));
		}
	},

	changePartyCreator: async (
		newPartyCreator: NewPartyCreator,
	): Promise<void> => {
		set((state) => ({
			loading: { ...state.loading, update: true },
			error: null,
		}));
		try {
			const updatedParty = await partyService.updatePartyCreator(
				newPartyCreator,
			);

			const currentItems = get().parties?.items || [];
			const updatedParties = currentItems.map((party) =>
				party.id === newPartyCreator.partyId
					? {
							...party,
							...updatedParty,
							members: party.members,
					  }
					: party,
			);

			const updatedRecentParties = get().recentParties.map((party) =>
				party.id === newPartyCreator.partyId
					? {
							...party,
							...updatedParty,
					  }
					: party,
			);

			set((state) => ({
				party: {
					...state.party,
					...updatedParty,
					members: state.party?.members || [],
				},
				parties: {
					...state.parties!,
					items: updatedParties,
				},
				recentParties: updatedRecentParties,
			}));
		} catch (error) {
			set({ error: "Failed to update party creator" });
			throw error;
		} finally {
			set((state) => ({ loading: { ...state.loading, update: false } }));
		}
	},

	deleteMembersFromParty: async (membersToRemove: MembersToRemove) => {
		set((state) => ({
			loading: { ...state.loading, delete: true },
			error: null,
		}));
		try {
			const currentParty = get().party;
			if (currentParty?.id === Number(membersToRemove.partyId)) {
				const updatedMembers = currentParty.members.filter(
					(member) => !membersToRemove.memberIds.includes(member.id),
				);

				set((state) => ({
					party: {
						...currentParty,
						members: updatedMembers,
					},
					recentParties: state.recentParties.map((party) =>
						party.id === Number(membersToRemove.partyId)
							? { ...party, members: updatedMembers }
							: party,
					),
				}));
			}
		} catch (error) {
			set({ error: "Failed to remove members" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, delete: false },
			}));
		}
	},
}));

export default usePartyStore;
