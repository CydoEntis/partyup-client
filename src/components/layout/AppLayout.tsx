import AppWrapper from "./AppWrapper";
import TopBarHeader from "./TopBarHeader";
import Sidenav from "./Sidenav";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

function AppLayout() {
	const [opened, { toggle }] = useDisclosure();
	const { user } = useAuthStore();

	return (
		<AppWrapper opened={opened}>
			<TopBarHeader
				opened={opened}
				toggle={toggle}
			/>
			{user && user.isLoggedIn ? <Sidenav /> : null}
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppWrapper>
	);
}

export default AppLayout;
