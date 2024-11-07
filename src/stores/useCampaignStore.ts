import { create } from "zustand";
import {
	Campaign,
	CreateCampaign,
	PaginatedCampaigns,
	UpdateCampaign,
} from "../shared/types/party.types";
import campaignService from "../services/partyService";
import { QueryParams } from "../shared/types/query-params.types";

type CampaignState = {
	recentCampaigns: Campaign[];
	campaigns: PaginatedCampaigns | null;
	campaign: Campaign | null;
	loading: boolean;
	error: string | null;
	getRecentCampaigns: () => Promise<void>;
	getCampaigns: (params?: QueryParams) => Promise<PaginatedCampaigns>;
	getCampaign: (id: string) => Promise<Campaign>;
	createCampaign: (campaign: CreateCampaign) => Promise<Campaign>;
	updateCampaign: (
		campaignId: string,
		updatedDetails: UpdateCampaign,
	) => Promise<void>;
	deleteCampaign: (id: string) => Promise<void>;
};

export const useCampaignStore = create<CampaignState>((set, get) => ({
	recentCampaigns: [],
	campaigns: null,
	campaign: null,
	loading: false,
	error: null,

	getRecentCampaigns: async () => {
		set({ loading: true, error: null });
		try {
			const queryParams = {
				orderOn: "updatedAt",
				pageSize: 5,
			};
			const campaigns = await campaignService.getAllCampaigns(queryParams);
			set({ recentCampaigns: campaigns.items });
		} catch (error) {
			set({ error: "Failed to fetch campaigns" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getCampaigns: async (params?: QueryParams) => {
		set({ loading: true, error: null });
		try {
			const campaigns = await campaignService.getAllCampaigns(params);
			set({ campaigns });
			return campaigns;
		} catch (error) {
			set({ error: "Failed to fetch campaigns" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	getCampaign: async (campaignId: string) => {
		const campaigns: Campaign[] | undefined = get().campaigns?.items;

		const existingCampaign = campaigns?.find((campaign) => campaign.id === +campaignId);
		if (existingCampaign) {
			set({ campaign: existingCampaign });
			return existingCampaign;
		}

		set({ loading: true, error: null });
		try {
			const campaign = await campaignService.getCampaignById(+campaignId);
			set({ campaign });
			return campaign;
		} catch (error) {
			set({ error: "Failed to fetch campaign" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	createCampaign: async (campaign: CreateCampaign): Promise<Campaign> => {
		set({ loading: true, error: null });
		try {
			const newCampaign = await campaignService.createCampaign(campaign);
			set((state) => ({
				campaigns: state.campaigns
					? {
							...state.campaigns,
							items: [newCampaign, ...state.campaigns.items],
							totalCount: state.campaigns.totalCount + 1,
					  }
					: {
							items: [newCampaign],
							totalCount: 1,
							totalPages: 1,
							currentPage: 1,
							hasNextPage: false,
							hasPreviousPage: false,
							pageRange: [],
					  },
			}));
			set({ campaign: newCampaign });
			return newCampaign;
		} catch (error) {
			set({ error: "Failed to create campaign" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	updateCampaign: async (
		campaignId: string,
		updatedDetails: UpdateCampaign,
	): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const updatedCampaign = await campaignService.updateCampaign(
				Number(campaignId),
				updatedDetails,
			);

			const currentItems = get().campaigns?.items || [];
			const updatedCampaigns = currentItems.map((campaign) =>
				campaign.id === Number(campaignId)
					? {
							...campaign,
							...updatedCampaign,
							members: campaign.members,
					  }
					: campaign,
			);

			set((state) => ({
				campaign: {
					...state.campaign,
					...updatedCampaign,
					members: state.campaign?.members || [],
				},
				campaigns: {
					...state.campaigns!,
					items: updatedCampaigns,
				},
			}));

			console.log("Updated campaigns: ", updatedCampaigns);
		} catch (error) {
			set({ error: "Failed to update campaign details" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},

	deleteCampaign: async (campaignId: string) => {
		set({ loading: true, error: null });
		try {
			await campaignService.deleteCampaign(+campaignId);
			set((state) => ({
				campaigns: {
					...state.campaigns!,
					items: state.campaigns?.items.filter((campaign) => campaign.id !== +campaignId) || [],
					totalCount: (state.campaigns?.totalCount || 0) - 1,
				},
			}));
		} catch (error) {
			set({ error: "Failed to delete campaign" });
			throw error;
		} finally {
			set({ loading: false });
		}
	},
}));

export default useCampaignStore;
