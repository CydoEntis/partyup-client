import { AppShell } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import PartyDrawer from "../../features/party/PartyDrawer";

import useUserStore from "../../stores/useUserStore";

import AvatarShop from "../../features/shop/AvatarShop";
import { useEffect } from "react";
import useAvatarStore from "../../stores/useAvatarStore";
import PrivateNavLinks from "../../features/navigation/PrivateNavLinks";

function PrivateSideNav() {
	const { isLightMode } = useGetColorTheme();
	const { user } = useUserStore();
	const [openedNewParty, { open: openNewParty, close: closeNewParty }] =
		useDisclosure(false);

	const [openedAvatarShop, { open: openAvatarShop, close: closeAvatarShop }] =
		useDisclosure(false);

	const { avatars, getAvatars } = useAvatarStore();

	useEffect(() => {
		const fetchAvatars = async () => {
			try {
				await getAvatars();
			} catch (error) {
				console.log(error);
			}
		};

		fetchAvatars();
	}, [getAvatars]);

	return (
		<>
			<PartyDrawer
				isOpened={openedNewParty}
				onClose={closeNewParty}
				drawerMode="create"
			/>
			<AvatarShop
				isAvatarShopOpen={openedAvatarShop}
				onCloseAvatarShop={closeAvatarShop}
				user={user!}
				avatars={avatars!}
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
				{user?.isLoggedIn && (
					<PrivateNavLinks
						user={user}
						onOpenNewParty={openNewParty}
						onOpenAvatarShop={openAvatarShop}
					/>
				)}
			</AppShell.Navbar>
		</>
	);
}

export default PrivateSideNav;
