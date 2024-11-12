import Header from "./Header";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import PrivateWrapper from "./PrivateWrapper";

function PrivateLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<PrivateWrapper opened={opened}>
			<Header
				opened={opened}
				toggle={toggle}
			/>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</PrivateWrapper>
	);
}

export default PrivateLayout;
