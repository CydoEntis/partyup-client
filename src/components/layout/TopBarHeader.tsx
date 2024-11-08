import { AppShell, Burger, Button, Flex, Group, Title } from "@mantine/core";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

type TopBarHeaderProps = {
	opened: boolean;
	toggle: () => void;
};

function TopBarHeader({ opened, toggle }: TopBarHeaderProps) {
	const { isLightMode } = useGetColorTheme();
	const { user } = useAuthStore();

	return (
		<AppShell.Header
			bg="secondary"
			styles={{
				header: {
					borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
				},
			}}
		>
			<Flex
				align="center"
				justify="space-between"
				h="100%"
				px={16}
			>
				<Group>
					<Title size="2rem" >PartyUp</Title>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom="sm"
						size="sm"
					/>
				</Group>

				{user ? null : (
					<Group>
						<Button
							component={NavLink}
							to="/login"
							variant="outline"
							color="violet"
						>
							Login
						</Button>
						<Button
							component={NavLink}
							to="/register"
							color="violet"
						>
							Register
						</Button>
					</Group>
				)}
			</Flex>
		</AppShell.Header>
	);
}

export default TopBarHeader;
