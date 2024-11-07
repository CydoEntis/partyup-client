import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PartiesPage from "../pages/party/PartiesPage";
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
				element: <div>Will be a dashboard</div>,
			},
			{
				path: "parties",
				element: <PartiesPage />,
			},
			{
				path: "account",
				element: <AccountPage />,
			},
			{
				path: "parties/:partyId/quests",
				element: <PartiesPage />,
				children: [
					{
						path: ":questId",
						element: <PartiesPage />,
					},
				],
			},
		],
	},
]);

export default router;
