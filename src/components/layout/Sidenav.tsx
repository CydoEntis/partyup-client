import {
	AppShell,
	Button,
	NavLink as MantineNavLink,
	Stack,
} from "@mantine/core";
import { LayoutGrid, LogOut, PlusCircle } from "lucide-react";
import {
	NavLink,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";
import NewCampaignDrawer from "../../features/campaign/NewCampaignDrawer";
import useCampaignStore from "../../stores/useCampaignStore";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";
import {
	PaginatedCampaigns,
} from "../../shared/types/campaign.types";

type Props = {};

function Sidenav({}: Props) {
	const { isLightMode } = useGetColorTheme();
	const [searchParams] = useSearchParams();
	const { campaignId } = useParams();
	const { logout } = useAuthStore();
	const navigate = useNavigate();
	const [
		openedNewCampaign,
		{ open: openNewCampaign, close: closeNewCampaign },
	] = useDisclosure(false);
	const [recentCampaigns, setRecentCampaigns] =
		useState<PaginatedCampaigns | null>(null);

	const { getCampaigns, loading } = useCampaignStore();

	const fetchCampaigns = async () => {
		try {
			const queryParams: { [key: string]: string | undefined } = {};
			searchParams.forEach((value, key) => {
				queryParams[key] = value;
			});
			const recentCampaigns = await getCampaigns(queryParams);
			setRecentCampaigns(recentCampaigns);
		} catch (error) {
			console.error("Failed to fetch campaigns:", error);
		}
	};

	useEffect(() => {
		fetchCampaigns();
	}, [searchParams, getCampaigns, campaignId]);

	console.log("Campaigns: ", recentCampaigns?.items);

	const logoutHandler = () => {
		logout();
		navigate("/login");
	};
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
							{recentCampaigns && recentCampaigns.items
								? recentCampaigns.items.map((campaign) => (
										<MantineNavLink
											key={campaign.id}
											component={NavLink}
											to={`/campaigns/${campaign.id}/quests`}
											label={campaign.title}
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
