import { ActionIcon, Menu } from "@mantine/core";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";
import useGetColorTheme from "../../hooks/useGetColorTheme";

type QuestOptionProps = {
	options: {
		icon: ReactNode;
		text: string;
		onClick: () => void;
	}[];
};

function QuestOptions({ options }: QuestOptionProps) {
	const { isLightMode } = useGetColorTheme();

	return (
		<Menu
			shadow="md"
			transitionProps={{ transition: "fade-down", duration: 300 }}
		>
			<Menu.Target>
				<ActionIcon
					variant="transparent"
					aria-label="Options"
					color={isLightMode ? "dark.1" : "darkMode.2"}
				>
					<Ellipsis size={30} />
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

export default QuestOptions;
