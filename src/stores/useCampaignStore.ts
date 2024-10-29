import { create } from "zustand";
import {
	Campaign,
	CreateCampaign,
	PaginatedCampaigns,
} from "../shared/types/campaign.types";
import campaignService from "../services/campaignService";
import { QueryParams } from "../shared/types/query-paramts.types";

type CampaignState = {
	campaigns: PaginatedCampaigns | null;
	loading: boolean;
	error: string | null;
	getCampaigns: (params?: QueryParams) => Promise<PaginatedCampaigns>;
	getCampaign: (id: number) => Promise<Campaign>;
	createCampaign: (campaign: CreateCampaign) => Promise<Campaign>;
	// updateCampaignDetails: (
	// 	id: number,
	// 	updatedDetails: UpdateCampaignDetails,
	// ) => Promise<void>;
	// updateCampaignLeader: (
	// 	id: number,
	// 	newLeader: UpdateCampaignLeader,
	// ) => Promise<void>;
	deleteCampaign: (id: number) => Promise<void>;
};

export const useCampaignStore = create<CampaignState>((set, get) => ({
	campaigns: null,
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

	getCampaign: async (campaignId: number) => {
		const campaigns: Campaign[] | undefined = get().campaigns?.items;

		if (campaigns) {
			const existingCampaign = campaigns.find(
				(campaign) => campaign.id === campaignId,
			);

			if (existingCampaign) {
				return existingCampaign;
			}
		}

		set({ loading: true, error: null });

		try {
			const campaign = await campaignService.getCampaignById(campaignId);
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
			return newCampaign;
		} catch (error) {
			set({ error: "Failed to create campaign", loading: false });
			throw error;
		}
	},

	// updateCampaignDetails: async (
	// 	id: number,
	// 	updatedCampaignDetails: UpdateCampaignDetails,
	// ): Promise<void> => {
	// 	set({ loading: true, error: null });
	// 	try {
	// 		const updatedCampaign = await campaignService.updateCampaignDetails(
	// 			id,
	// 			updatedCampaignDetails,
	// 		);
	// 		set((state) => {
	// 			const updatedCampaigns =
	// 				state.campaigns?.items.map((campaign) =>
	// 					campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign,
	// 				) || [];

	// 			return {
	// 				campaigns: {
	// 					...state.campaigns!,
	// 					items: updatedCampaigns,
	// 				},
	// 				campaign:
	// 					state.campaign?.id === id
	// 						? { ...state.campaign, ...updatedCampaign }
	// 						: state.campaign,
	// 				loading: false,
	// 			};
	// 		});
	// 	} catch (error) {
	// 		set({ error: "Failed to update campaign details", loading: false });
	// 		throw error;
	// 	}
	// },

	// updateCampaignLeader: async (id: number, newLeader: UpdateCampaignLeader) => {
	// 	set({ loading: true, error: null });
	// 	try {
	// 		const { userId } = await campaignService.updateCampaignLeader(
	// 			id,
	// 			newLeader,
	// 		);
	// 		set((state) => {
	// 			const updatedCampaigns =
	// 				state.campaigns?.items.map((campaign) =>
	// 					campaign.id === id
	// 						? { ...campaign, campaignLeaderId: userId }
	// 						: campaign,
	// 				) || [];

	// 			return {
	// 				campaigns: {
	// 					...state.campaigns!,
	// 					items: updatedCampaigns,
	// 				},
	// 				campaign:
	// 					state.campaign?.id === id
	// 						? { ...state.campaign, campaignLeaderId: userId }
	// 						: state.campaign,
	// 				loading: false,
	// 			};
	// 		});
	// 	} catch (error) {
	// 		set({ error: "Failed to update campaign leader", loading: false });
	// 		throw error;
	// 	}
	// },

	deleteCampaign: async (campaignId: number) => {
		set({ loading: true, error: null });
		try {
			await campaignService.deleteCampaign(campaignId);
			set((state) => ({
				campaigns: {
					...state.campaigns!,
					items:
						state.campaigns?.items.filter(
							(campaign) => campaign.id !== campaignId,
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
