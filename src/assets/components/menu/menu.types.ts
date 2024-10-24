import { ReactNode } from "react";

export type MenuProps = {
	trigger: ReactNode;
	children: ReactNode;
};

export type MenuTriggerProps = {
	leftIcon?: ReactNode;
	text?: string;
	rightIcon?: ReactNode;
};

export type MenuItemProps = {
	items: any;
};
