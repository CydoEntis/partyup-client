import { AppShell, Button, Stack, Image, Flex } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import PartyDrawer from "../../features/party/PartyDrawer";

import useAuthStore from "../../stores/useAuthStore";
import AuthenticatedNav from "../../features/navigation/AuthenticatedNav";
import { NavLink } from "react-router-dom";

import PartyUpLogo from "../../assets/party-up-logo.png";
import PartyUpLogo2 from "../../assets/partyup-logo.png";
import ThemeToggle from "../../features/theme/ThemeToggle";
import UnauthenticatedNav from "../../features/navigation/UnauthenticatedNav";

function Sidenav() {
	const { isLightMode } = useGetColorTheme();
	const { user } = useAuthStore();
	const [openedNewParty, { open: openNewParty, close: closeNewParty }] =
		useDisclosure(false);

	return (
		<>
			<PartyDrawer
				isOpened={openedNewParty}
				onClose={closeNewParty}
				drawerMode="create"
			/>
			<AppShell.Navbar
				p="md"
				bg="secondary"
				style={{
					navbar: {
						borderColor: isLightMode ? "#DCDEE0" : "#3A3A3A",
					},
				}}
			>
				{user?.isLoggedIn ? (
					<AuthenticatedNav
						user={user}
						onOpenNewParty={openNewParty}
					/>
				) : (
					<UnauthenticatedNav />
				)}
			</AppShell.Navbar>
		</>
	);
}

export default Sidenav;
