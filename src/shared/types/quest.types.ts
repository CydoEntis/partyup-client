import { Member } from "./member.types";
import { PriorityLevel } from "./prioty.types";
import { CreateStep, Step } from "./step.types";

export type Quest = {
	id: number;
	title: string;
	description: string;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
	priority: PriorityLevel;
	partyId: number;
	members: Member[];
	steps: Step[];
	completedSteps: number;
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
	partyId: number;
	title: string;
	description: string;
	priority: PriorityLevel;
	dueDate: Date;
	memberIds: Number[];
	steps: CreateStep[];
};

export type UpdateQuest = {
	id: number;
	partyId: number;
	title: string;
	description: string;
	priority: PriorityLevel;
	dueDate: Date;
	memberIds: Number[];
	steps: Step[];
};

export type QuestStats = {
	totalQuests: number;
	completedQuests: number;
	inProgressQuests: number;
	pastDueQuests: number;
}