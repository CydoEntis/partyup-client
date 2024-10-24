
import { createBrowserRouter } from "react-router-dom";
import AuthenticatedLayout from "../assets/components/layout/AuthenticatedLayout";
import Test from "../assets/pages/Test";

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
