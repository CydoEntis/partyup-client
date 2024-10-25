import {
	AppShell,
	Button,
	NavLink as MantineNavLink,
	Stack,
} from "@mantine/core";
import { LayoutGrid, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";
import NewCampaignDrawer from "../../features/campaign/NewCampaignDrawer";

type Props = {};

function Sidenav({}: Props) {
	const { isLightMode } = useGetColorTheme();
	const [
		openedNewCampaign,
		{ open: openNewCampaign, close: closeNewCampaign },
	] = useDisclosure(false);

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
							{Array.from({ length: 8 }).map((_, index) => (
								<MantineNavLink
									key={index}
									component={NavLink}
									to={`/campaigns/${index}`}
									label={`Campaign ${index + 1}`}
									color="violet"
									className="rounded-md"
									mt={8}
								/>
							))}
						</MantineNavLink>
					</Stack>
					<Stack mt="auto">
						<ThemeToggle />
					</Stack>
				</Stack>
			</AppShell.Navbar>
		</>
	);
}

export default Sidenav;
