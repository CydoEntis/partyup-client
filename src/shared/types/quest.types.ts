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
	campaignId: number;
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
