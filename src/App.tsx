import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import "@mantine/core/styles.css";

import {
	createTheme,
	MantineProvider,
} from "@mantine/core";

function App() {
	const theme = createTheme({
		colors: {
			primary: [
				"#7d736e",
				"#655954",
				"#545050",
				"#3b3737",
				"#242020",
				"#4e413b",
				"#3A3A3A",
				"#232323",
				"#1C1C1C",
				"#111111",
			],
			darkMode: [
				"#7d736e",
				"#655954",
				"#545050",
				"#3b3737",
				"#242020",
				"#4e413b",
				"#3A3A3A",
				"#232323",
				"#1C1C1C",
				"#111111",
			],
			lightMode: [
				"#FCFDFD",
				"#FBFCFD",
				"#F9FBFC",
				"#d0d1d4",
				"#b7b8bc",
				"#9ea0a4",
				"#DCDEE0",
				"#FFFFFF",
				"#F9F9FB",
				"#F5F4F4",
			],
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
