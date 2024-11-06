import { Avatar } from "./avatar.types";

export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = {
	displayName: string;
	confirmPassword: string;
	avatar: Avatar;
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
