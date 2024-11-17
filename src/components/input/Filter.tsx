import { ActionIcon, Checkbox, Menu, SimpleGrid, Stack } from "@mantine/core";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type FilterProps = {
	sortOptions: Record<string, string>[];
	dateOptions: Record<string, string>[];
	handleFiltering: (filter: string) => void;
};

function Filter({ sortOptions, dateOptions, handleFiltering }: FilterProps) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(
		"created-at",
	);

	const handleFilterChange = (value: string, isChecked: boolean) => {
		setSelectedFilter(isChecked ? value : null);
		handleFiltering(value);
	};

	return (
		<Menu
			shadow="md"
			width={300}
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
				<SimpleGrid cols={2}>
					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Sort By</Menu.Label>
							<Menu.Divider />
						</Stack>
						{sortOptions.map(({ label, value }) => (
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

					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Filter Date</Menu.Label>
							<Menu.Divider />
						</Stack>
						{dateOptions.map(({ label, value }) => (
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
				</SimpleGrid>
			</Menu.Dropdown>
		</Menu>
	);
}

export default Filter;
