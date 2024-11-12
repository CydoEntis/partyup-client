import { AppShell } from "@mantine/core";

import useGetColorTheme from "../../hooks/useGetColorTheme";

import PublicNavLinks from "../../features/navigation/PublicNavLinks";

function PublicSideNav() {
	const { isLightMode } = useGetColorTheme();

	return (
		<>
			<AppShell.Navbar
				p="md"
				bg="secondary"
				style={{
					navbar: {
						borderColor: isLightMode ? "#DCDEE0" : "#3A3A3A",
					},
				}}
			>
				<PublicNavLinks />
			</AppShell.Navbar>
		</>
	);
}

export default PublicSideNav;
