import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/Test";
import CampaignPage from "../pages/campaign/CampaignPage";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			// <AuthenticatedRoute>
			<AppLayout />
			// </AuthenticatedRoute>
		),
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
			{
				path: "dashboard",
				element: <Test />,
			},
			{
				path: "campaigns/:campaignId/quests",
				element: <CampaignPage />,
				children: [
					{
						path: ":questId",
						element: <CampaignPage />,
					},
				],
			},
		],
	},
]);

export default router;
