export type Member = {
	id: number;
	role: string;
	userId: string;
	displayName: string;
	email: string;
	avatar: number;
	currentLevel: number;
	joinedOn: Date;
};

export type CreateMember = Partial<Pick<Member, "userId" | "id">>;

export type UpdateMemberRole = Partial<Pick<Member, "id" | "role">>;
