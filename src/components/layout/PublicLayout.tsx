import Header from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import PublicSideNav from "./PublicSideNav";
import PublicWrapper from "./PublicWrapper";

function PublicLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<PublicWrapper opened={opened}>
			<Header
				opened={opened}
				toggle={toggle}
			/>
			<PublicSideNav />
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</PublicWrapper>
	);
}

export default PublicLayout;
