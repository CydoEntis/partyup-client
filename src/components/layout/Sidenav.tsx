import {
	ActionIcon,
	AppShell,
	Box,
	Button,
	Collapse,
	Drawer,
	NavLink as MantineNavLink,
	Stack,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { ChevronRight, LayoutGrid, Moon, PlusCircle, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";

type Props = {};

function Sidenav({}: Props) {
	const { isLightMode } = useGetColorTheme();
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Drawer
				opened={opened}
				onClose={close}
				title="Authentication"
				position="right"
			>
				This bitch open
			</Drawer>
			<AppShell.Navbar
				p="md"
				bg={isLightMode ? "lightMode.7" : "darkMode.8"}
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
							onClick={open}
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
