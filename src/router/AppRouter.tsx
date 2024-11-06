import { createBrowserRouter } from "react-router-dom";
import Test from "../pages/Test";
import CampaignPage from "../pages/campaign/CampaignPage";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PartiesPage from "../pages/campaign/PartiesPage";
import AccountPage from "../pages/account/AccountPage";

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
				path: "parties",
				element: <PartiesPage />,
			},
			{
				path: "account",
				element: <AccountPage />
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
