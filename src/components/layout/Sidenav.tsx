import {
	AppShell,
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
	Skeleton,
} from "@mantine/core";
import { LayoutGrid, LogOut, PlusCircle, Users2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import ThemeToggle from "../../features/theme/ThemeToggle";
import useLogout from "../../hooks/useLogout";
import PartyDrawer from "../../features/party/PartyDrawer";

import { useEffect, useState } from "react";
import useAvatarStore from "../../stores/useAvatarStore";
import useAuthStore from "../../stores/useAuthStore";
import AccountInfo from "../../features/account/AccountInfo";
import usePartyStore from "../../stores/usePartyStore";

function Sidenav() {
	const { isLightMode } = useGetColorTheme();
	const {
		getRecentParties,
		recentParties,
		loading: { recent },
	} = usePartyStore();
	const { user } = useAuthStore();
	const logoutHandler = useLogout();
	const [isRecentOpen, setIsRecentOpen] = useState(false);
	const [openedNewParty, { open: openNewParty, close: closeNewParty }] =
		useDisclosure(false);

	useEffect(() => {
		const fetchRecentParties = async () => {
			await getRecentParties();
			setIsRecentOpen(recentParties.length > 0);
		};
		fetchRecentParties();
	}, [recentParties.length]);

	const toggleRecentOpen = () => setIsRecentOpen((prev) => !prev);
	return (
		<>
			<PartyDrawer
				isOpened={openedNewParty}
				onClose={closeNewParty}
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
				{recent ? (
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
								onClick={openNewParty}
								my={20}
							>
								New Party
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
								{recentParties?.map((party) => (
									<MantineNavLink
										key={party.id}
										component={NavLink}
										to={`/parties/${party.id}/quests`}
										label={
											<Flex
												align="center"
												gap={16}
												px={10}
											>
												<Indicator
													inline
													color={party.color}
													size={8}
												/>
												{party.title}
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
