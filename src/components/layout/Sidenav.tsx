import {
	AppShell,
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
	Skeleton,
	Box,
	Paper,
	Group,
	Burger,
} from "@mantine/core";
import {
	ChevronRight,
	LayoutGrid,
	LogOut,
	PlusCircle,
	ShoppingCart,
	Users2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";
import useLogout from "../../hooks/useLogout";
import CampaignDrawer from "../../features/party/PartyDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import { useEffect, useState } from "react";
import AvatarShop from "../../features/shop/AvatarShop";
import useAvatarStore from "../../stores/useAvatarStore";
import useAuthStore from "../../stores/useAuthStore";
import UserLevel from "../../features/user/UserLevel";
import AccountInfo from "../../features/account/AccountInfo";

function Sidenav() {
	const { isLightMode } = useGetColorTheme();
	const { getRecentCampaigns, recentCampaigns, loading } = useCampaignStore();
	const { user } = useAuthStore();
	const { getAvatarShop } = useAvatarStore();
	const logoutHandler = useLogout();
	const [isRecentOpen, setIsRecentOpen] = useState(false);
	const [
		openedNewCampaign,
		{ open: openNewCampaign, close: closeNewCampaign },
	] = useDisclosure(false);

	const [openedAvatarShop, { open: openAvatarShop, close: closeAvatarShop }] =
		useDisclosure(false);

	const handleAvatarShop = async () => {
		if (user) {
			await getAvatarShop(user.id);
			openAvatarShop();
		}
	};

	useEffect(() => {
		const fetchRecentCampaigns = async () => {
			await getRecentCampaigns();
			setIsRecentOpen(recentCampaigns.length > 0);
		};
		fetchRecentCampaigns();
	}, [recentCampaigns.length]);

	const toggleRecentOpen = () => setIsRecentOpen((prev) => !prev);
	return (
		<>
			<CampaignDrawer
				isOpened={openedNewCampaign}
				onClose={closeNewCampaign}
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
				{loading ? (
					<Stack style={{ flexGrow: 1 }}>
						<Skeleton
							height={30}
							radius="md"
							mb="sm"
						/>
						<Skeleton
							height={30}
							radius="md"
							mb="sm"
						/>
						<Skeleton
							height={30}
							radius="md"
							mb="sm"
						/>
						<Skeleton
							height={30}
							radius="md"
							mb="sm"
						/>
						<Skeleton
							height={30}
							radius="md"
							mb="sm"
						/>
					</Stack>
				) : (
					<Stack style={{ flexGrow: 1 }}>
						<Stack gap={8}>
							<AccountInfo user={user!} />
							<Button
								color="violet"
								variant="light"
								rightSection={<PlusCircle size={20} />}
								h={40}
								onClick={openNewCampaign}
								my={20}
							>
								New Campaign
							</Button>
							<MantineNavLink
								component={NavLink}
								to="/dashboard"
								leftSection={<LayoutGrid size={20} />}
								label="Dashboard"
								className="rounded-md"
								color="violet"
							/>

							<MantineNavLink
								label="Recent Parties"
								className="rounded-md"
								variant="subtle"
								color="gray"
								opened={isRecentOpen}
								onClick={toggleRecentOpen}
							>
								{recentCampaigns?.map((campaign) => (
									<MantineNavLink
										key={campaign.id}
										component={NavLink}
										to={`/campaigns/${campaign.id}/quests`}
										label={
											<Flex
												align="center"
												gap={16}
												px={10}
											>
												<Indicator
													inline
													color={campaign.color}
													size={8}
												/>
												{campaign.title}
											</Flex>
										}
										color="violet"
										className="rounded-md"
										mt={8}
									/>
								))}
							</MantineNavLink>

							<MantineNavLink
								component={NavLink}
								to="/parties"
								leftSection={<Users2 size={20} />}
								label="Parties"
								className="rounded-md"
								color="violet"
							/>
						</Stack>
						<Stack mt="auto">
							<Button
								justify="start"
								leftSection={<LogOut size={20} />}
								variant="light"
								color="violet"
								h={40}
								onClick={logoutHandler}
							>
								Log out
							</Button>
							<ThemeToggle />
						</Stack>
					</Stack>
				)}
			</AppShell.Navbar>
		</>
	);
}

export default Sidenav;
