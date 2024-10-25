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
	userId: string;
	email: string;
	displayName: string;
	tokens: Tokens;
	avatar: Avatar;
	currentLevel: number;
	currentExp: number;
	expToNextLevel: number;
	isLoggedIn: boolean;
};

export type Avatar = 1 | 2 | 3 | 4;
