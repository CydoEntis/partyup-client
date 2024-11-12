import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PartiesPage from "../pages/party/PartiesPage";
import PartyPage from "../pages/party/PartyPage";
import AuthGuard from "../guards/AuthGuard";
import UnAuthGuard from "../guards/UnAuthGuard";
import PrivateLayout from "../components/layout/PrivateLayout";

// Define public routes separately with UnAuthGuard
const publicRoutes = [
	{
		path: "/",
		element: (
			<UnAuthGuard>
				<PrivateLayout />
			</UnAuthGuard>
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
		],
	},
];

// Define protected routes with AuthGuard
const protectedRoutes = [
	{
		path: "dashboard",
		element: <div>Will be a dashboard</div>,
	},
	{
		path: "parties",
		element: <PartiesPage />,
	},
	{
		path: "parties/:partyId/quests",
		element: <PartyPage />,
		children: [
			{
				path: ":questId",
				element: <PartyPage />,
			},
		],
	},
];

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthGuard>
				<PrivateLayout />
			</AuthGuard>
		),
		children: protectedRoutes,
	},
	...publicRoutes,
]);

export default router;
