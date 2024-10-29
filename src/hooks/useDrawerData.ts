import { useState, useEffect } from "react";

export type ViewTypes = "view" | "create" | "edit";

type UseDrawerDataProps = {
	defaultTitle: string;
};

type UseDrawerDataResult = {
	viewType: ViewTypes;
	drawerTitle: string;
	setDrawerState: (viewType: ViewTypes, title: string) => void;
};

function useDrawerData({
	defaultTitle,
}: UseDrawerDataProps): UseDrawerDataResult {
	const [viewType, setViewType] = useState<ViewTypes>("create");
	const [drawerTitle, setDrawerTitle] = useState(defaultTitle);

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
