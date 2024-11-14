import { Avatar } from "./avatar.types";

export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = {
	displayName: string;
	confirmPassword: string;
	avatarId: number;
} & LoginCredentials;

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

export type User = {
	id: string;
	email: string;
	displayName: string;
	tokens: Tokens;
	avatar: Avatar;
	currency: number;
	currentLevel: number;
	currentExp: number;
	expToNextLevel: number;
	isLoggedIn: boolean;
};

export type UserStats = {
	totalParties: number;
	totalQuests: number;
	completedQuests: number;
	inProgressQuests: number;
	pastDueQuests: number;
	questsCompletedCurrentMonth: QuestCompletionOverTime[];
	questsCompletedByDay: QuestCompletionByDay[];
};

export type QuestCompletionOverTime = {
	year: number;
	monthL: number;
	questCount: number;
};

export type QuestCompletionByDay = {
	date: string;
	questCount: number;
};
