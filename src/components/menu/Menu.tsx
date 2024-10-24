import { Menu as MantineMenu } from "@mantine/core";
import { MenuProps } from "./menu.types";

function Menu({ trigger, children }: MenuProps) {
	return (
		<MantineMenu
			shadow="md"
			width={200}
		>
			{trigger}
			{children}
		</MantineMenu>
	);
}

export default Menu;
