import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import PartiesPage from "../pages/party/PartiesPage";
import PartyPage from "../pages/party/PartyPage";
import AuthGuard from "../guards/AuthGuard";
import UnAuthGuard from "../guards/UnAuthGuard";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<AuthGuard>
				<AppLayout />
			</AuthGuard>
		),
		children: [
			{
				path: "login",
				element: (
					<UnAuthGuard>
						<LoginPage />
					</UnAuthGuard>
				),
			},
			{
				path: "register",
				element: (
					<UnAuthGuard>
						<RegisterPage />
					</UnAuthGuard>
				),
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
				path: "parties/:partyId/quests",
				element: <PartyPage />,
				children: [
					{
						path: ":questId",
						element: <PartyPage />,
					},
				],
			},
		],
	},
]);

export default router;
