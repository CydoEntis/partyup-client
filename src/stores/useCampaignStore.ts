import { create } from "zustand";
import {
	Campaign,
	CreateCampaign,
	PaginatedCampaigns,
	UpdateCampaign,
} from "../shared/types/campaign.types";
import campaignService from "../services/campaignService";
import { QueryParams } from "../shared/types/query-paramts.types";

type CampaignState = {
	campaigns: PaginatedCampaigns | null;
	campaign: Campaign | null;
	loading: boolean;
	error: string | null;
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
	campaigns: null,
	campaign: null,
	loading: false,
	error: null,

	getCampaigns: async (params?: QueryParams) => {
		set({ loading: true, error: null });
		try {
			const campaigns = await campaignService.getAllCampaigns(params);
			set({ campaigns, loading: false });
			return campaigns;
		} catch (error) {
			set({ error: "Failed to fetch campaigns", loading: false });
			throw error;
		}
	},

	getCampaign: async (campaignId: string) => {
		const campaigns: Campaign[] | undefined = get().campaigns?.items;

		if (campaigns) {
			const existingCampaign = campaigns.find(
				(campaign) => campaign.id === +campaignId,
			);

			set({ campaign: existingCampaign });

			if (existingCampaign) {
				return existingCampaign;
			}
		}

		set({ loading: true, error: null });

		try {
			const campaign = await campaignService.getCampaignById(+campaignId);
			set({ campaign: campaign });
			return campaign;
		} catch (error) {
			set({ error: "Failed to fetch campaign", loading: false });
			throw error;
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
				loading: false,
			}));
			set({ campaign: newCampaign });
			return newCampaign;
		} catch (error) {
			set({ error: "Failed to create campaign", loading: false });
			throw error;
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
				loading: false,
			}));

			console.log("Updated campaigns: ", updatedCampaigns);
		} catch (error) {
			set({ error: "Failed to update campaign details", loading: false });
			throw error;
		}
	},

	deleteCampaign: async (campaignId: string) => {
		set({ loading: true, error: null });
		try {
			await campaignService.deleteCampaign(+campaignId);
			set((state) => ({
				campaigns: {
					...state.campaigns!,
					items:
						state.campaigns?.items.filter(
							(campaign) => campaign.id !== +campaignId,
						) || [],
					totalCount: (state.campaigns?.totalCount || 0) - 1,
				},
				loading: false,
			}));
		} catch (error) {
			set({ error: "Failed to delete campaign", loading: false });
			throw error;
		}
	},
}));

export default useCampaignStore;
