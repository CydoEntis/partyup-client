import { ActionIcon, Menu } from "@mantine/core";
import { Ellipsis, Settings } from "lucide-react";
import { ReactNode } from "react";
import useGetColorTheme from "../../hooks/useGetColorTheme";

type MenuOptionsProps = {
	options: {
		icon: ReactNode;
		text: string;
		onClick: () => void;
	}[];
};

function MenuOptionss({ options }: MenuOptionsProps) {
	const { isLightMode } = useGetColorTheme();

	return (
		<Menu
			shadow="md"
			transitionProps={{ transition: "fade-down", duration: 300 }}
		>
			<Menu.Target>
				<ActionIcon
					size="lg"
					variant="light"
					color="violet"
					aria-label="Options"
				>
					<Settings size={20} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				{options.map((option, index) => (
					<Menu.Item
						key={index}
						leftSection={option.icon}
						onClick={option.onClick}
					>
						{option.text}
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);
}

export default MenuOptionss;
