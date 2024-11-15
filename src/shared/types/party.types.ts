import { Color } from "./color.types";
import { Member } from "./member.types";
import { QuestStats } from "./quest.types";

export type Party = {
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
	questStats: QuestStats;
};

export type PaginatedParties = {
	items: Party[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	pageRange: number[];
};

export type CreateParty = {
	title: string;
	description: string;
	color: Color;
	dueDate: Date;
};

export type UpdateParty = {
	id: number;
	title: string;
	description: string;
	color: Color;
	dueDate: Date;
};

export type UpdatePartyLeader = {
	partyId: number;
	userId: string;
};
