import { useState } from "react";

export type ViewTypes = "view" | "create" | "edit";

type UseDrawerTypeHandlerProps = {
	defaultTitle: string;
	defaultView: ViewTypes;
};

type UseDrawerTypeHandlerResult = {
	drawerViewType: ViewTypes;
	drawerTitle: string;
	setDrawer: (viewType: ViewTypes, title: string) => void;
};

function useDrawerTypeHandler({
	defaultTitle,
	defaultView,
}: UseDrawerTypeHandlerProps): UseDrawerTypeHandlerResult {
	const [drawerViewType, setDrawerViewType] = useState<ViewTypes>(defaultView);
	const [drawerTitle, setDrawerTitle] = useState(defaultTitle);

	const setDrawer = (viewType: ViewTypes, title: string) => {
		setDrawerViewType(viewType);
		setDrawerTitle(title);
	};

	return {
		drawerViewType,
		drawerTitle,
		setDrawer,
	};
}

export default useDrawerTypeHandler;
