import { Color } from "./color.types";
import { Member } from "./member.types";
import { Quest } from "./quest.types";

export type Campaign = {
	id: number;
	title: string;
	description: string;
	creatorId: string;
	creator: string;
	color: Color;
	totalMembers: number;
	members: SimpleMember[];
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
};

export type SimpleMember = {
	id: number;
	displayName: string;
	avatar: number;
}

export type PaginatedCampaigns = {
	items: Campaign[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	pageRange: number[];
};

export type CreateCampaign = {
	name: string;
	description: string;
	color: Color;
	dueDate: Date;
};

// export type UpdateCampaignDetails = {
// 	id: number;
// } & Partial<Pick<Campaign, "name" | "description" | "color" | "dueDate">>;

// export type UpdateCampaignLeader = {
// 	campaignId: number;
// 	userId: string;
// };
