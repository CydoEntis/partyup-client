import { Button, Group, Stack } from "@mantine/core";
import ThemeToggle from "../theme/ThemeToggle";
import { NavLink } from "react-router-dom";

type Props = {};

function UnauthenticatedNav({}: Props) {
	return (
		<Group gap={8} justify="center" align="center">
			<Button
				component={NavLink}
				to="/login"
				variant="outline"
				color="violet"
			>
				Login
			</Button>
			<Button
				component={NavLink}
				to="/register"
				color="violet"
			>
				Register
			</Button>
			<ThemeToggle />
		</Group>
	);
}

export default UnauthenticatedNav;
