import { Box, Stack, SimpleGrid, Container } from "@mantine/core";
import AccountLevel from "./AccountLevel";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";
import AccountAvatars from "./AccountAvatars";
import useAuthStore from "../../stores/useAuthStore";

function AccountPage() {
	const { user } = useAuthStore();

	return (
		<>
			{user ? (
				<Box p={32}>
					<Container size="90%">
						<Stack gap={12}>
							<>
								<AccountLevel user={user} />
								<SimpleGrid cols={2}>
									<AccountDetails user={user} />
									<ChangePassword />
									<AccountAvatars />
								</SimpleGrid>
							</>
						</Stack>
					</Container>
				</Box>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default AccountPage;
