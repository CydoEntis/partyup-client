import { Member } from "./member.types";
import { PriorityLevel } from "./prioty.types";

export type Quest = {
	id: number;
	title: string;
	description: string;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
	priority: PriorityLevel;
	campaignId: number;
	members: Member[];
	totalMembers: number;
	steps: Step[];
	completedSteps: number;
	totalSteps: number;
};

export type PaginatedQuests = {
	items: Quest[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	pageRange: number[];
};

export type CreateQuest = {
	campaignId: number;
	title: string;
	description: string;
	priority: PriorityLevel;
	dueDate: Date;
	memberIds: Number[];
	steps: CreateStep[];
};

export type UpdateQuest = {
	id: number;
	campaignId: number;
	title: string;
	description: string;
	priority: PriorityLevel;
	dueDate: Date;
	memberIds: Number[];
	steps: Step[];
};

export type Step = {
	id: number;
	description: string;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type CreateStep = {
	description: string;
};

// export type UpdateQuestDetails = {
// 	id: number;
// } & Partial<Pick<Quest, "title" | "description" | "color" | "dueDate">>;

// export type UpdateQuestLeader = {
// 	campaignId: number;
// 	userId: string;
// };
