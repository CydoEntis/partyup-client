import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import "@mantine/core/styles.css";

import {
	colorsTuple,
	createTheme,
	MantineProvider,
	virtualColor,
} from "@mantine/core";
import { useEffect } from "react";
import useAuthStore from "./stores/useAuthStore";

function App() {
	const { restoreSession } = useAuthStore();

	const theme = createTheme({
		cursorType: "pointer",
		colors: {
			darkPrimary: colorsTuple("#111111"),
			lightPrimary: colorsTuple("#F5F4F4"),
			darkSecondary: colorsTuple("#1C1C1C"),
			lightSecondary: colorsTuple("#FFFFFF"),
			darkCard: colorsTuple("#232323"),
			lightCard: colorsTuple("#FFFFFF"),
			primary: virtualColor({
				name: "primary",
				dark: "darkPrimary",
				light: "lightPrimary",
			}),
			secondary: virtualColor({
				name: "secondary",
				dark: "darkSecondary",
				light: "lightSecondary",
			}),
			card: virtualColor({
				name: "card",
				dark: "darkCard",
				light: "lightCard",
			}),
		},
	});

	useEffect(() => {
		restoreSession();
	}, [restoreSession]);

	return (
		<>
			<MantineProvider theme={theme}>
				<RouterProvider router={router} />
			</MantineProvider>
		</>
	);
}

export default App;
