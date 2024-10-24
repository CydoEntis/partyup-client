import { AppShell, Burger, Group } from "@mantine/core";
import useGetColorTheme from "../../../hooks/useGetColorTheme";

type TopBarHeaderProps = {
	opened: boolean;
	toggle: () => void;
};

function TopBarHeader({ opened, toggle }: TopBarHeaderProps) {
	const { isLightMode } = useGetColorTheme();
	return (
		<AppShell.Header
			bg={isLightMode ? "lightMode.7" : "darkMode.8"}
			styles={{
				header: {
					borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
				},
			}}
		>
			<Group
				h="100%"
				px="md"
			>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="sm"
					size="sm"
				/>
			</Group>
		</AppShell.Header>
	);
}

export default TopBarHeader;
