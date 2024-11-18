import {
	Button,
	Flex,
	Indicator,
	NavLink as MantineNavLink,
	Stack,
	Text,
} from "@mantine/core";

import {
	Book,
	BookOpen,
	FolderClosed,
	FolderOpen,
	LayoutGrid,
	LogOut,
	PlusCircle,
	ShoppingBag,
	SquareLibrary,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import usePartyStore from "../../stores/usePartyStore";
import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import { User } from "../../shared/types/auth.types";
import SideNavSkeleton from "../loading-skeletons/SideNavSkeleton";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import AccountIndicator from "../account/AccountIndicator";
import AccountManagementModal from "../account/AccountManagementModal";
import ThemeToggle from "../theme/ThemeToggle";

type PrivateNavLinksProps = {
	user: User;
	onOpenNewParty: () => void;
	onOpenAvatarShop: () => void;
	closeNav: () => void;
};

function PrivateNavLinks({
	user,
	onOpenNewParty,
	onOpenAvatarShop,
	closeNav,
}: PrivateNavLinksProps) {
	const {
		getRecentParties,
		recentParties,
		loading: { recent },
	} = usePartyStore();

	const isMobile = useMediaQuery("(max-width: 768px)");

	const handleClose = () => {
		if (isMobile) closeNav();
	};

	const logoutHandler = () => {
		useLogout();
		handleClose();
	};
	const [isRecentOpen, setIsRecentOpen] = useState(true);

	useEffect(() => {
		const fetchRecentParties = async () => {
			await getRecentParties();
			setIsRecentOpen(recentParties.length > 0);
		};
		fetchRecentParties();
	}, [recentParties.length]);

	const toggleRecentOpen = () => {
		setIsRecentOpen((prev) => !prev);
	};
	const [
		accountDetailsOpened,
		{ open: openAccountDetails, close: closeAccountDetails },
	] = useDisclosure(false);

	const handleOpenAccountDetails = () => {
		openAccountDetails();
		handleClose();
	};

	const handleOpenNewParty = () => {
		onOpenNewParty();
		handleClose();
	};

	const handleOpenAvatarShop = () => {
		onOpenAvatarShop();
		handleClose();
	};

	return (
		<>
			<AccountManagementModal
				isOpened={accountDetailsOpened}
				onClose={closeAccountDetails}
			/>

			{recent ? (
				<SideNavSkeleton />
			) : (
				<Stack
					style={{
						flexGrow: 1,
						overflowY: "auto",
						maxHeight: "calc(100vh - 120px)",
					}}
				>
					<Stack gap={8}>
						<AccountIndicator
							user={user!}
							onOpen={handleOpenAccountDetails}
						/>
						<Button
							color="violet"
							variant="light"
							rightSection={<PlusCircle size={20} />}
							h={40}
							onClick={handleOpenNewParty}
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
							onClick={handleClose}
						/>
						<MantineNavLink
							component={NavLink}
							to="/parties"
							leftSection={<SquareLibrary size={20} />}
							label="Your Parties"
							className="rounded-md"
							color="violet"
							onClick={handleClose}
						/>
						<MantineNavLink
							label="Most Recent"
							className="rounded-md"
							leftSection={
								isRecentOpen ? <BookOpen size={20} /> : <Book size={20} />
							}
							variant="subtle"
							color="gray"
							opened={isRecentOpen}
							onClick={toggleRecentOpen}
						>
							{recentParties.length === 0 ? (
								<Text size="xs">No recent parties</Text>
							) : null}
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
									onClick={handleClose}
								/>
							))}
						</MantineNavLink>
					</Stack>
					<Stack mt="auto">
						<Button
							justify="start"
							leftSection={<ShoppingBag size={20} />}
							variant="light"
							color="violet"
							h={40}
							onClick={handleOpenAvatarShop}
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
		</>
	);
}

export default PrivateNavLinks;
