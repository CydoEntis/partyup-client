import Header from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import PrivateSideNav from "./PrivateSideNav";
import PrivateWrapper from "./PrivateWrapper";

function PrivateLayout() {
	const [opened, { toggle, close }] = useDisclosure();

	return (
		<PrivateWrapper opened={opened}>
			<Header
				opened={opened}
				toggle={toggle}
			/>
			<PrivateSideNav opened={opened} closeNav={close}/>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</PrivateWrapper>
	);
}

export default PrivateLayout;
