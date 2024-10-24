import {
	ActionIcon,
	AppShell,
	Box,
	Button,
	Collapse,
	NavLink as MantineNavLink,
	Stack,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { ChevronRight, LayoutGrid, Moon, PlusCircle, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useGetColorTheme from "../../../hooks/useGetColorTheme";
import { useDisclosure } from "@mantine/hooks";

type Props = {};

function Sidenav({}: Props) {
	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	});
	const { isLightMode } = useGetColorTheme();

	return (
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
								component={NavLink}
								key={index}
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
					<ActionIcon
						onClick={() =>
							setColorScheme(computedColorScheme === "light" ? "dark" : "light")
						}
						variant="default"
						size="xl"
						aria-label="Toggle color scheme"
					>
						{computedColorScheme === "light" ? (
							<Moon size={20} />
						) : (
							<Sun size={20} />
						)}
					</ActionIcon>
				</Stack>
			</Stack>
		</AppShell.Navbar>
	);
}

export default Sidenav;
