import {
	AppShell,
	Button,
	NavLink as MantineNavLink,
	Stack,
} from "@mantine/core";
import { LayoutGrid, LogOut, PlusCircle } from "lucide-react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";
import NewCampaignDrawer from "../../features/campaign/NewCampaignDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import { useEffect } from "react";

type Props = {};

function Sidenav({}: Props) {
	const { isLightMode } = useGetColorTheme();
	const [searchParams] = useSearchParams();

	const [
		openedNewCampaign,
		{ open: openNewCampaign, close: closeNewCampaign },
	] = useDisclosure(false);

	const { getCampaigns, campaigns, loading } = useCampaignStore();

	const fetchCampaigns = async () => {
		try {
			const queryParams: { [key: string]: string | undefined } = {};
			searchParams.forEach((value, key) => {
				queryParams[key] = value;
			});
			await getCampaigns(queryParams);
		} catch (error) {
			console.error("Failed to fetch campaigns:", error);
		}
	};

	useEffect(() => {
		fetchCampaigns();
	}, [searchParams, getCampaigns]);

	console.log("Campaigns: ", campaigns);

	return (
		<>
			<NewCampaignDrawer
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
							{campaigns && campaigns.items
								? campaigns.items.map((campaign) => (
										<MantineNavLink
											key={campaign.id}
											component={NavLink}
											to={`/campaigns/${campaign.id}`}
											label={campaign.name}
											color="violet"
											className="rounded-md"
											mt={8}
										/>
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
