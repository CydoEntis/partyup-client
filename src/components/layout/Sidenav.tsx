import {
	AppShell,
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
	Skeleton,
} from "@mantine/core";
import {
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
import CampaignDrawer from "../../features/campaign/CampaignDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import { useEffect, useState } from "react";
import AvatarShop from "../../features/shop/AvatarShop";
import useAvatarStore from "../../stores/useAvatarStore";
import useAuthStore from "../../stores/useAuthStore";

type Props = {};

function Sidenav({}: Props) {
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
			<AvatarShop
				isOpened={openedAvatarShop}
				onClose={closeAvatarShop}
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
							<Button
								color="violet"
								variant="light"
								rightSection={<PlusCircle size={20} />}
								h={40}
								onClick={openNewCampaign}
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
								leftSection={<ShoppingCart size={20} />}
								variant="light"
								color="violet"
								h={40}
								onClick={handleAvatarShop}
							>
								Avatar Shop
							</Button>
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
