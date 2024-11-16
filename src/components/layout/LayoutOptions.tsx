import { ActionIcon, Group, Menu, Tooltip } from "@mantine/core";
import { useState } from "react";
import { GridType } from "../../shared/types/auth.types";
import { Columns4Icon, LayoutGrid, LayoutList } from "lucide-react";
import useUserStore from "../../stores/useUserStore";

function LayoutOptions() {
	const { setLayout } = useUserStore();
	const [activeLayout, setActiveLayout] = useState<GridType>("grid");

	let layoutIcon = <LayoutGrid size={20} />;

	const handleLayoutChange = (layout: GridType) => {
		setLayout(layout);
		setActiveLayout(layout);
	};

	if (activeLayout === "grid") {
		layoutIcon = <LayoutGrid size={20} />;
	} else if (activeLayout === "list") {
		layoutIcon = <LayoutList size={20} />;
	} else {
		layoutIcon = <Columns4Icon size={20} />;
	}

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
				>
					{layoutIcon}
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					leftSection={<LayoutGrid size={20} />}
					onClick={() => handleLayoutChange("grid")}
				>
					Grid View
				</Menu.Item>
				<Menu.Item
					leftSection={<LayoutList size={20} />}
					onClick={() => handleLayoutChange("list")}
				>
					List View
				</Menu.Item>
				<Menu.Item
					leftSection={<Columns4Icon size={20} />}
					onClick={() => handleLayoutChange("kanban")}
				>
					Kanban
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
		// <Group>
		// 	<Tooltip label="Grid View">
		// 		<ActionIcon
		// 			size="lg"
		// 			variant="light"
		// 			color="violet"
		// 			onClick={() => setLayout("grid")}
		// 		>
		// 			<LayoutGrid size={20} />
		// 		</ActionIcon>
		// 	</Tooltip>
		// 	<Tooltip label="List View">
		// 		<ActionIcon
		// 			size="lg"
		// 			variant="light"
		// 			color="violet"
		// 			onClick={() => setLayout("list")}
		// 		>
		// 			<LayoutList size={20} />
		// 		</ActionIcon>
		// 	</Tooltip>
		// </Group>
	);
}

export default LayoutOptions;
