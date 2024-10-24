import {
	ActionIcon,
	AppShell,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import useGetColorTheme from "../../../hooks/useGetColorTheme";

type Props = {};

function Sidenav({}: Props) {
	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	});
	const { isLightMode } = useGetColorTheme();

	return (
		<AppShell.Navbar
			p="md"
			bg={isLightMode ? "lightMode.7" : "darkMode.8"}
			style={{
				navbar: {
					borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
				},
			}}
		>
			<NavLink to="/dashboard">Dashboard</NavLink>
			<ActionIcon
				onClick={() =>
					setColorScheme(computedColorScheme === "light" ? "dark" : "light")
				}
				variant="default"
				size="xl"
				aria-label="Toggle color scheme"
			>
				{computedColorScheme === "light" ? (
					<Moon size={20} />
				) : (
					<Sun size={20} />
				)}
			</ActionIcon>
		</AppShell.Navbar>
	);
}

export default Sidenav;
