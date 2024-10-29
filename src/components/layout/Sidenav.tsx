import {
	AppShell,
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
} from "@mantine/core";
import { Group, LayoutGrid, LogOut, PlusCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";
import useAuthStore from "../../stores/useAuthStore";

import useFetchRecentCampaigns from "../../hooks/useFetchCampaigns";
import useLogout from "../../hooks/useLogout";
import CampaignDrawer from "../../features/campaign/CampaignDrawer";

type Props = {};

function Sidenav({}: Props) {
	const { isLightMode } = useGetColorTheme();
	const { recentCampaigns, loading, error } = useFetchRecentCampaigns();
	const logoutHandler = useLogout();

	const [
		openedNewCampaign,
		{ open: openNewCampaign, close: closeNewCampaign },
	] = useDisclosure(false);

	return (
		<>
			<CampaignDrawer
				isOpened={openedNewCampaign}
				onClose={closeNewCampaign}
				
			/>
			<AppShell.Navbar
				p="md"
				bg="secondary"
				style={{
					navbar: {
						borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
					},
				}}
			>
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
							color="violet"
							className="rounded-md"
						/>

						<MantineNavLink
							label="Campaigns"
							className="rounded-md"
						>
							{recentCampaigns && recentCampaigns.items
								? recentCampaigns.items.map((campaign) => (
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
										></MantineNavLink>
								  ))
								: null}
						</MantineNavLink>
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
			</AppShell.Navbar>
		</>
	);
}

export default Sidenav;
