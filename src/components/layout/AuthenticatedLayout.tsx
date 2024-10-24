import AppWrapper from "./AppWrapper";
import TopBarHeader from "./TopBarHeader";
import Sidenav from "./Sidenav";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

function AuthenticatedLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppWrapper opened={opened}>
			<TopBarHeader
				opened={opened}
				toggle={toggle}
			/>
			<Sidenav />

			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppWrapper>
	);
}

export default AuthenticatedLayout;
