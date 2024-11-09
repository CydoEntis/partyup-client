import { AppShell, Burger, Button, Flex, Group, Title } from "@mantine/core";
import useGetColorTheme from "../../hooks/useGetColorTheme";
import { NavLink } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

type HeaderProps = {
	opened: boolean;
	toggle: () => void;
};

function Header({ opened, toggle }: HeaderProps) {
	const { isLightMode } = useGetColorTheme();
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
				<h1 className="title text-4xl">Party Up</h1>

				<Group>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom="sm"
						size="sm"
					/>
				</Group>
			</Flex>
		</AppShell.Header>
	);
}

export default Header;
