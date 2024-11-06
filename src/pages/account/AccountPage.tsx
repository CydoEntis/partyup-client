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

function AccountPage() {
	const { user } = useAuthStore();
	const { avatars, getAvatarShop } = useAvatarStore();

	const percentage = user
		? getPercentage(user.currentExp, user.expToNextLevel)
		: 0;
	const avatarImage = user ? useAvatar(user.avatar.id) : undefined;

	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		const loadAvatarShop = async () => {
			if (user) {
				await getAvatarShop(user.id);
			}
		};
		loadAvatarShop();
	}, [user, getAvatarShop]);

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
								<Paper
									withBorder
									p={16}
								>
									<Group pb={16}>
										<Avatar
											src={avatarImage}
											alt="User's avatar"
											bg="violet"
											size="xl"
										/>
										<Text size="xl">{user.displayName}</Text>
									</Group>
									<Stack gap={2}>
										<Group justify="space-between">
											<Group>
												<Text size="md">Level</Text>
												<Text size="md">{user.currentLevel}</Text>
											</Group>
											<Text
												ta="center"
												size="sm"
											>
												{user.currentExp} exp / {user.expToNextLevel} exp
											</Text>
										</Group>
										<Progress
											value={percentage}
											w="100%"
											size="md"
											animated
											color="violet"
										/>
									</Stack>
								</Paper>
								<SimpleGrid cols={2}>
									<Paper
										withBorder
										p={16}
									>
										<Group
											align="center"
											justify="space-between"
											pb={10}
										>
											<Title size="xl">Account Details</Title>
											<ActionIcon
												variant="light"
												color="violet"
											>
												<Edit size={20} />
											</ActionIcon>
										</Group>
										<Divider />
										<Group
											justify="space-between"
											w="25%"
											py={12}
										>
											<Text>Display Name</Text>
											<Text>{user.displayName}</Text>
										</Group>
										<Group
											justify="space-between"
											w="25%"
											py={12}
										>
											<Text>Email</Text>
											<Text>{user.email}</Text>
										</Group>
									</Paper>
									<Paper
										withBorder
										p={16}
									>
										<Group
											align="center"
											justify="space-between"
											pb={10}
										>
											<Title size="xl">Change Password</Title>
										</Group>
										<Divider />
										<Stack
											gap={12}
											py={8}
										>
											<Text pb={12}>Need to change your password?</Text>
											<Button
												variant="light"
												color="violet"
												fullWidth
											>
												Change Password
											</Button>
										</Stack>
									</Paper>
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
