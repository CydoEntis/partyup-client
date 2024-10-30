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
	campaignId: number;
	assignedMembers: Member[];
	totalMembers: number;
	tasks: Task[];
	completedTasks: number;
	totalTasks: number;
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
	tasks: CreateTask[];
};

export type UpdateQuest = {
	id: number;
	campaignId: number;
	title: string;
	description: string;
	priority: PriorityLevel;
	dueDate: Date;
	memberIds: Number[];
	tasks: CreateTask[];
};

export type Task = {
	id: number;
	description: string;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type CreateTask = {
	description: string;
};

// export type UpdateQuestDetails = {
// 	id: number;
// } & Partial<Pick<Quest, "title" | "description" | "color" | "dueDate">>;

// export type UpdateQuestLeader = {
// 	campaignId: number;
// 	userId: string;
// };
