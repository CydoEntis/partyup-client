import { Box, Stack, SimpleGrid, Container } from "@mantine/core";
import AccountLevel from "./AccountLevel";
import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePassword";
import AccountAvatars from "./AccountAvatars";

function AccountPage() {

	return (
		<>
			<Box p={32}>
				<Container size="90%">
					<Stack gap={12}>
						<>
							<AccountLevel />
							<SimpleGrid cols={2}>
								<AccountDetails />
								<ChangePassword />
								<AccountAvatars />
							</SimpleGrid>
						</>
					</Stack>
				</Container>
			</Box>
		</>
	);
}

export default AccountPage;
