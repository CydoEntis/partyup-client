import { AppShell, Button, Stack, Image, Flex } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import PartyDrawer from "../../features/party/PartyDrawer";

import useAuthStore from "../../stores/useAuthStore";
import AuthenticatedNav from "./AuthenticatedLinks";
import { NavLink } from "react-router-dom";

import PartyUpLogo from "../../assets/party-up-logo.png";
import PartyUpLogo2 from "../../assets/partyup-logo.png";

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
				<Stack style={{ flexGrow: 1 }}>
					{user?.isLoggedIn ? (
						<AuthenticatedNav
							user={user}
							onOpenNewParty={openNewParty}
						/>
					) : (
						<>
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
						</>
					)}
				</Stack>
			</AppShell.Navbar>
		</>
	);
}

export default Sidenav;
