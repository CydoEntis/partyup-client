import { Box, Stack, SimpleGrid, Container, Skeleton } from "@mantine/core";
import useUserStore from "../../stores/useUserStore";
import { useEffect } from "react";
import useAvatarStore from "../../stores/useAvatarStore";
import AccountLevel from "../../pages/account/AccountLevel";
import AccountDetails from "./AccountDetails2";
import ChangePassword from "../../pages/account/ChangePassword";
import AccountAvatars from "../../pages/account/AccountAvatars";

function AccountPage() {
	const {
		avatars,
		getAvatars,
		getNextUnlockableTier,
		nextUnlockableTierOfAvatars,
		loading: { nextTier, list },
	} = useAvatarStore();
	const { user } = useUserStore();

	useEffect(() => {
		const loadAvatarsWithDelay = async () => {
			if (user) {
				// Add a delay to simulate loading time
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await getAvatars();
			}
		};
		loadAvatarsWithDelay();
	}, [user, getAvatars]);

	useEffect(() => {
		const loadNextTierWithDelay = async () => {
			try {
				// Add a delay to simulate loading time
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await getNextUnlockableTier();
			} catch (error) {
				console.error("Error loading next unlockable tier:", error);
			}
		};
		loadNextTierWithDelay();
	}, [getNextUnlockableTier]);

	if (user === null || avatars === null || nextUnlockableTierOfAvatars === null)
		return (
			<Box p={32}>
				<Container size="90%">
					<Stack gap={12}>
						<Skeleton
							visible={true}
							h={250}
						/>
						<SimpleGrid cols={2}>
							<Skeleton
								visible={true}
								h={250}
							/>
							<Skeleton
								visible={true}
								h={250}
							/>
							<Skeleton
								visible={true}
								h={250}
							/>
						</SimpleGrid>
					</Stack>
				</Container>
			</Box>
		);

	return (
		<Box p={32}>
			<Container size="90%">
				<Stack gap={12}>
					{nextTier || list ? (
						<>
							<Skeleton
								visible={true}
								h={250}
							/>
							<SimpleGrid cols={2}>
								<Skeleton
									visible={true}
									h={250}
								/>
								<Skeleton
									visible={true}
									h={250}
								/>
								<Skeleton
									visible={true}
									h={250}
								/>
							</SimpleGrid>
						</>
					) : (
						<>
							<AccountLevel user={user} />
							<SimpleGrid cols={2}>
								<AccountDetails user={user} />
								<ChangePassword />
								<AccountAvatars
									user={user}
									avatars={avatars}
									tierOfAvatars={nextUnlockableTierOfAvatars}
								/>
							</SimpleGrid>
						</>
					)}
				</Stack>
			</Container>
		</Box>
	);
}

export default AccountPage;
