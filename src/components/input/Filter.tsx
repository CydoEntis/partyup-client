import { ActionIcon, Checkbox, Menu, Stack } from "@mantine/core";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type FilterProps = {
	filterOptions: Record<string, string>[];
	handleFiltering: (filter: string) => void;
};

function Filter({ filterOptions, handleFiltering }: FilterProps) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(
		"created-at",
	);

	const handleFilterChange = (value: string, isChecked: boolean) => {
		setSelectedFilter(isChecked ? value : null);
		handleFiltering(value)
	};

	return (
		<Menu
			shadow="md"
			width={200}
		>
			<Menu.Target>
				<ActionIcon
					size="lg"
					variant="light"
					color="violet"
				>
					<Settings2 size={20} />
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown p={8}>
				<Menu.Label>Filter</Menu.Label>
				<Menu.Divider />
				<Stack py={8}>
					{filterOptions.map(({ label, value }) => (
						<Checkbox
							key={value}
							checked={selectedFilter === value}
							onChange={(event) =>
								handleFilterChange(value, event.currentTarget.checked)
							}
							label={label}
						/>
					))}
				</Stack>
			</Menu.Dropdown>
		</Menu>
	);
}

export default Filter;
