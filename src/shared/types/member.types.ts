import { Avatar } from "./auth.types";

export type Member = {
	id: number;
	role: string;
	userId: string;
	displayName: string;
	email: string;
	avatar: Avatar;
	currentLevel: number;
	joinedOn: Date;
};

export type PaginatedMembers = {
	items: Member[];
	totalCount: number;
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	pageRange: number[];
};

export type CreateMember = Partial<Pick<Member, "userId" | "id">>;

export type UpdateMemberRole = Partial<Pick<Member, "id" | "role">>;
