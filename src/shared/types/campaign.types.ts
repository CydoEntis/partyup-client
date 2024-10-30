import { Color } from "./color.types";
import { Member } from "./member.types";

export type Campaign = {
	id: number;
	title: string;
	description: string;
	creatorId: string;
	creator: string;
	color: Color;
	members: Member[];
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
};

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
	title: string;
	description: string;
	color: Color;
	dueDate: Date;
};

export type UpdateCampaign = {
	id: number;
	title: string;
	description: string;
	color: Color;
	dueDate: Date;
};

export type UpdateCampaignLeader = {
	campaignId: number;
	userId: string;
};
