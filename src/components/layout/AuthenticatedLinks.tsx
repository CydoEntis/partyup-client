import {
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
} from "@mantine/core";

import {
	FolderClosed,
	FolderOpen,
	LayoutGrid,
	LogOut,
	PlusCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";
import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import { User } from "../../shared/types/auth.types";
import SideNavSkeleton from "../../features/loading-skeletons/SideNavSkeleton";
import AccountDetails from "../../pages/account/AccountDetails";
import { useDisclosure } from "@mantine/hooks";
import AccountInfo from "../../features/account/AccountInfo";

type AuthenticatedNavProps = { user: User; onOpenNewParty: () => void };

function AuthenticatedNav({ user, onOpenNewParty }: AuthenticatedNavProps) {
	const {
		getRecentParties,
		recentParties,
		loading: { recent },
	} = usePartyStore();
	const logoutHandler = useLogout();
	const [isRecentOpen, setIsRecentOpen] = useState(false);

	useEffect(() => {
		const fetchRecentParties = async () => {
			await getRecentParties();
			setIsRecentOpen(recentParties.length > 0);
		};
		fetchRecentParties();
	}, [recentParties.length]);

	const toggleRecentOpen = () => setIsRecentOpen((prev) => !prev);
	const [
		accountDetailsOpened,
		{ open: openAccountDetails, close: closeAccountDetails },
	] = useDisclosure(false);
	return (
		<>
			<AccountDetails
				isOpened={accountDetailsOpened}
				onClose={closeAccountDetails}
			/>

			{recent ? (
				<SideNavSkeleton />
			) : (
				<>
					<Stack gap={8}>
						<AccountInfo
							user={user!}
							onOpen={openAccountDetails}
						/>
						<Button
							color="violet"
							variant="light"
							rightSection={<PlusCircle size={20} />}
							h={40}
							onClick={onOpenNewParty}
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
							component={NavLink}
							to="/parties"
							leftSection={<FolderClosed size={20} />}
							label="Your Parties"
							className="rounded-md"
							color="violet"
						/>
						<MantineNavLink
							label="Most Recent"
							className="rounded-md"
							leftSection={<FolderOpen size={20} />}
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
												processing
												size={10}
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
					</Stack>
				</>
			)}
		</>
	);
}

export default AuthenticatedNav;
