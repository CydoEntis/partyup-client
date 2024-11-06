export type Avatar = {
	id: number;
	name: string;
};

export type AvatarShopItem = {
	id: number;
	name: string;
	displayName: string;
	tier: number;
	unlockLevel: number;
	cost: number;
	isUnlocked: boolean;
};
