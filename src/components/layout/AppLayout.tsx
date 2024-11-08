import Header from "./Header";
import Sidenav from "./Sidenav";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import AppWrapper from "./AppWrapper";

function AppLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppWrapper opened={opened}>
			<Header
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

export default AppLayout;
