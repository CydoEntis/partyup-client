export type DrawerProps = {
	isOpened: boolean;
	onClose: () => void;
	viewType?: "create" | "view" | "edit";
};
