import { Menu } from "@mantine/core";
import { MenuItemProps } from "./menu.types";


function MenuItems({ items }: MenuItemProps) {
	return (
		<Menu.Dropdown>
			{items.map((item: any, index: number) => (
				<Menu.Item key={index}>{item}</Menu.Item>
			))}
		</Menu.Dropdown>
	);
}

export default MenuItems;
