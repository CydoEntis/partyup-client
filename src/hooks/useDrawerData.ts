import { useState, useEffect } from "react";

export type ViewTypes = "view" | "create" | "edit";

type UseDrawerDataResult = {
	viewType: ViewTypes;
	drawerTitle: string;
	setDrawerState: (viewType: ViewTypes, title: string) => void;
};

function useDrawerData(): UseDrawerDataResult {
	const [viewType, setViewType] = useState<ViewTypes>("view");
	const [drawerTitle, setDrawerTitle] = useState("");

	const setDrawerState = (viewType: ViewTypes, title: string) => {
		setViewType(viewType);
		setDrawerTitle(title);
	};

	return {
		viewType,
		drawerTitle,
		setDrawerState,
	};
}

export default useDrawerData;
