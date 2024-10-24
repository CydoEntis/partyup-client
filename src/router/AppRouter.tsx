
import { createBrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "../components/layout/AuthenticatedLayout";
import Test from "../pages/Test";
import CampaignPage from "../pages/campaign/CampaignPage";


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
				path: "campaigns/:campaignId",
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
