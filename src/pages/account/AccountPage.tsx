import {
	Box,
	Text,
	Stack,
	Group,
	Paper,
	Avatar,
	SimpleGrid,
	Title,
	Container,
	Progress,
	ActionIcon,
	Divider,
	Button,
	Image,
	Modal,
	Flex,
} from "@mantine/core";
import useAuthStore from "../../stores/useAuthStore";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import Coin from "../../assets/coin.png";
import useAvatar from "../../hooks/useGetAvatar";
import { Edit } from "lucide-react";
import AvatarShop from "../../features/shop/AvatarShop";
import { useDisclosure } from "@mantine/hooks";
import useAvatarStore from "../../stores/useAvatarStore";
import { useEffect } from "react";
import AccountLevel from "./AccountLevel";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";

function AccountPage() {
	const { user } = useAuthStore();
	const { avatars, getAvatarShop } = useAvatarStore();

	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		const loadAvatarShop = async () => {
			if (user) {
				await getAvatarShop(user.id);
			}
		};
		loadAvatarShop();
	}, [user, getAvatarShop]);

	// TODO Add a modal that will open up when edit avatar is clicked and lets u set your avatar.
	// TODO When edit button in account details is clicked display a form so the user can update their info.
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Unlock Avatar?"
				centered
			>
				<Text ta="center">Are you sure you want to unlock this avatar?</Text>
				<Text
					size="xs"
					c="red"
					ta="center"
				>
					Action cannot be reverted
				</Text>
				<Flex
					justify="space-evenly"
					gap={8}
					mt={20}
				>
					<Button
						w="100%"
						variant="light"
						color="violet"
						onClick={() => {
							// Handle confirmation logic here
							close();
						}}
					>
						Confirm
					</Button>
					<Button
						w="100%"
						variant="light"
						color="gray"
						onClick={close}
					>
						Cancel
					</Button>
				</Flex>
			</Modal>
			<Box p={32}>
				<Container size="90%">
					<Stack gap={12}>
						{user && avatars && (
							<>
								<AccountLevel user={user} />
								<SimpleGrid cols={2}>
									<AccountDetails user={user} />
									<ChangePassword />
								</SimpleGrid>
								<Paper
									withBorder
									p={16}
								>
									<Group
										align="center"
										justify="space-between"
										pb={10}
									>
										<Title size="xl">Unlock an Avatar</Title>
										<Group>
											<Text size="lg">{user.currency}</Text>
											<Image
												src={Coin}
												w={24}
											/>
										</Group>
									</Group>
									<AvatarShop
										onUnlock={open}
										avatars={avatars}
										user={user}
									/>
								</Paper>
							</>
						)}
					</Stack>
				</Container>
			</Box>
		</>
	);
}

export default AccountPage;
