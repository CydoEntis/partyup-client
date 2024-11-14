import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PartiesPage from "../pages/party/PartiesPage";
import PartyPage from "../pages/party/PartyPage";
import PrivateGuard from "../guards/PrivateGuard";
import PublicGuard from "../guards/PublicGuard";
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
		element: <PartiesPage />,
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
