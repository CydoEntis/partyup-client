import { Member } from "./member.types";

export type Quest = {
	id: number;
	name: string;
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
	name: string;
	description: string;
	dueDate: Date;
	memberIds: Number[];
	tasks: Task[];
};

export type Task = {
	id: number,
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
// } & Partial<Pick<Quest, "name" | "description" | "color" | "dueDate">>;

// export type UpdateQuestLeader = {
// 	campaignId: number;
// 	userId: string;
// };
