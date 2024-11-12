import Header from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AppWrapper from "./PublicWrapper";
import PrivateSideNav from "./PrivateSideNav";

function PrivateLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppWrapper opened={opened}>
			<Header
				opened={opened}
				toggle={toggle}
			/>
			<PrivateSideNav />
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppWrapper>
	);
}

export default PrivateLayout;
