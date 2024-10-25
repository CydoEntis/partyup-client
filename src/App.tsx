import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import "@mantine/core/styles.css";

import {
	colorsTuple,
	createTheme,
	MantineProvider,
	virtualColor,
} from "@mantine/core";

function App() {
	// const theme = createTheme({
	// 	colors: {
	// 		primary: [
	// 			"#7d736e",
	// 			"#655954",
	// 			"#545050",
	// 			"#3b3737",
	// 			"#242020",
	// 			"#4e413b",
	// 			"#3A3A3A",
	// 			"#232323",
	// 			"#1C1C1C",
	// 			"#111111",
	// 		],
	// 		darkMode: [
	// 			"#7d736e", 1
	// 			"#655954",2
	// 			"#545050",3
	// 			"#3b3737",4
	// 			"#242020",5
	// 			"#4e413b",6
	// 			"#3A3A3A",7
	// 			"#232323",8
	// 			"#1C1C1C",9
	// 			"#111111",
	// 		],
	// 		lightMode: [
	// 			"#FCFDFD",
	// 			"#FBFCFD",
	// 			"#F9FBFC",
	// 			"#d0d1d4",
	// 			"#b7b8bc",
	// 			"#9ea0a4",
	// 			"#DCDEE0",
	// 			"#FFFFFF",
	// 			"#F9F9FB",
	// 			"#F5F4F4",
	// 		],
	// 	},
	// });
	const theme = createTheme({
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

	return (
		<>
			<MantineProvider theme={theme}>
				<RouterProvider router={router} />
			</MantineProvider>
		</>
	);
}

export default App;
