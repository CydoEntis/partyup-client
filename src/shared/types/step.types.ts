export type CreateStep = {
	description: string;
};

export type Step = {
	id: number;
	description: string;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type UpdateStep = {
	id: number;
	isCompleted: boolean;
};
