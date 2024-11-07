import { create } from "zustand";
import {
	Party,
	CreateParty,
	PaginatedParties,
	UpdateParty,
} from "../shared/types/party.types";
import partieservice from "../services/partyService";
import { QueryParams } from "../shared/types/query-params.types";

type Partiestate = {
	recentParties: Party[];
	parties: PaginatedParties | null;
	party: Party | null;
	loading: boolean;
	error: string | null;
	getRecentParties: () => Promise<void>;
	getParties: (params?: QueryParams) => Promise<PaginatedParties>;
	getParty: (id: string) => Promise<Party>;
	createParty: (party: CreateParty) => Promise<Party>;
	updateParty: (partyId: string, updatedDetails: UpdateParty) => Promise<void>;
	deleteParty: (id: string) => Promise<void>;
};

export const usePartiestore = create<Partiestate>((set, get) => ({
	recentParties: [],
	parties: null,
	party: null,
	loading: false,
	error: null,

	getRecentParties: async () => {
		set({ loading: true, error: null });
		try {
			const queryParams = {
				orderOn: "updatedAt",
				pageSize: 5,
			};
			const parties = await partieservice.getAllParties(queryParams);
			set({ recentParties: parties.items });
		} catch (error) {
			set({ error: "Failed to fetch parties" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getParties: async (params?: QueryParams) => {
		set({ loading: true, error: null });
		try {
			const parties = await partieservice.getAllParties(params);
			set({ parties });
			return parties;
		} catch (error) {
			set({ error: "Failed to fetch parties" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getParty: async (partyId: string) => {
		const parties: Party[] | undefined = get().parties?.items;

		const existingParty = parties?.find((party) => party.id === +partyId);
		if (existingParty) {
			set({ party: existingParty });
			return existingParty;
		}

		set({ loading: true, error: null });
		try {
			const party = await partieservice.getPartyById(+partyId);
			set({ party });
			return party;
		} catch (error) {
			set({ error: "Failed to fetch party" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	createParty: async (party: CreateParty): Promise<Party> => {
		set({ loading: true, error: null });
		try {
			const newParty = await partieservice.createParty(party);
			set((state) => ({
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
			}));
			set({ party: newParty });
			return newParty;
		} catch (error) {
			set({ error: "Failed to create party" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	updateParty: async (
		partyId: string,
		updatedDetails: UpdateParty,
	): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const updatedParty = await partieservice.updateParty(
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
			}));

			console.log("Updated parties: ", updatedParties);
		} catch (error) {
			set({ error: "Failed to update party details" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	deleteParty: async (partyId: string) => {
		set({ loading: true, error: null });
		try {
			await partieservice.deleteParty(+partyId);
			set((state) => ({
				parties: {
					...state.parties!,
					items:
						state.parties?.items.filter((party) => party.id !== +partyId) || [],
					totalCount: (state.parties?.totalCount || 0) - 1,
				},
			}));
		} catch (error) {
			set({ error: "Failed to delete party" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},
}));

export default usePartiestore;
