import { Menu, Button } from "@mantine/core";
import { MenuTriggerProps } from "./menu.types";



function MenuTrigger({ leftIcon, text, rightIcon }: MenuTriggerProps) {
	return (
		<Menu.Target>
			<Button
				leftSection={leftIcon}
				rightSection={rightIcon}
			>
				{text}
			</Button>
		</Menu.Target>
	);
}

export default MenuTrigger;
