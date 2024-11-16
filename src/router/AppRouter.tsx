import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PartyListPage from "../pages/party/PartyListPage";
import PartyPage from "../pages/party/PartyPage";
import PrivateGuard from "../guards/PrivateGuard";
import PrivateLayout from "../components/layout/PrivateLayout";
import PublicLayout from "../components/layout/PublicLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import QuestPage from "../pages/quest/QuestPage";

const publicRoutes = [
	{
		path: "/",
		element: <PublicLayout />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
];

const protectedRoutes = [
	{
		path: "dashboard",
		element: <DashboardPage />,
	},
	{
		path: "parties",
		element: <PartyListPage />,
	},
	{
		path: "parties/:partyId/quests",
		element: <PartyPage />,
	},
	{
		path: "parties/:partyId/quests/:questId",
		element: <QuestPage />,
	},
];

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<PrivateGuard>
				<PrivateLayout />
			</PrivateGuard>
		),
		children: protectedRoutes,
	},
	...publicRoutes,
]);

export default router;
