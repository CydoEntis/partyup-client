import {
	AppShell,
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
} from "@mantine/core";
import { LayoutGrid, LogOut, PlusCircle } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";

import useFetchRecentCampaigns from "../../hooks/useFetchCampaigns";
import useLogout from "../../hooks/useLogout";
import CampaignDrawer from "../../features/campaign/CampaignDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import { AxiosError } from "axios";
import { useEffect } from "react";

type Props = {};

function Sidenav({}: Props) {
	const { isLightMode } = useGetColorTheme();
	const { getCampaigns, campaigns } = useCampaignStore();

	const logoutHandler = useLogout();

	useEffect(() => {
		const fetchRecentCampaigns = async () => {
			const queryParams = {
				orderOn: "updatedAt",
				pageSize: 5
			}
			await getCampaigns(queryParams);
		};

		fetchRecentCampaigns();
	}, [campaigns]);

	const [
		openedNewCampaign,
		{ open: openNewCampaign, close: closeNewCampaign },
	] = useDisclosure(false);

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
							{campaigns && campaigns.items
								? campaigns.items.map((campaign) => (
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
