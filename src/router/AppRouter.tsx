
import { createBrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "../assets/components/layout/AuthenticatedLayout";
import Test from "../assets/pages/Test";
import CampaignPage from "../assets/pages/CampaignListPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			// <AuthenticatedRoute>
				<AuthenticatedLayout />
			// </AuthenticatedRoute>
		),
		children: [
			{
				path: "dashboard",
				element: <Test />,
			},
			{
				path: "/campaings/:campaignId",
				element: <CampaignPage />
			}
		],
	},
	// {
	// 	path: "/auth",
	// 	element: <UnauthenticatedLayout />,
	// 	children: [
	// 		{
	// 			path: "login",
	// 			element: <LoginPage />,
	// 		},
	// 		{
	// 			path: "register",
	// 			element: <RegisterPage />,
	// 		},
	// 	],
	// },

]);

export default router;
