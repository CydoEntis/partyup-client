import { ActionIcon, Checkbox, Menu, SimpleGrid, Stack, Text } from "@mantine/core";
import { Settings2 } from "lucide-react";
import { useState } from "react";

type FilterProps = {
	sortOptions: Record<string, string>[];
	dateOptions: Record<string, string>[];
	handleFiltering: (filter: string) => void;
};

function Filter({ sortOptions, dateOptions, handleFiltering }: FilterProps) {
	const [selectedSort, setSelectedSort] = useState<string | null>("title");
	const [selectedDate, setSelectedDate] = useState<string | null>("created-at");

	// Handle sort option change
	const handleSortChange = (value: string, isChecked: boolean) => {
		if (isChecked || selectedDate) {
			setSelectedSort(isChecked ? value : selectedSort);
			handleFiltering(isChecked ? value : selectedSort!);
		}
	};

	// Handle date option change
	const handleDateChange = (value: string, isChecked: boolean) => {
		if (isChecked || selectedSort) {
			setSelectedDate(isChecked ? value : selectedDate);
			handleFiltering(isChecked ? value : selectedDate!);
		}
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
				<Text size="xs" ta="center">Search Filters</Text>
				<SimpleGrid cols={2}>
					{/* Sort by options */}
					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Sort By</Menu.Label>
							<Menu.Divider />
						</Stack>
						{sortOptions.map(({ label, value }) => (
							<Checkbox
								key={value}
								checked={selectedSort === value}
								onChange={(event) =>
									handleSortChange(value, event.currentTarget.checked)
								}
								label={label}
								disabled={selectedSort === value}
							/>
						))}
					</Stack>

					{/* Date filter options */}
					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Filter Date</Menu.Label>
							<Menu.Divider />
						</Stack>
						{dateOptions.map(({ label, value }) => (
							<Checkbox
								key={value}
								checked={selectedDate === value}
								onChange={(event) =>
									handleDateChange(value, event.currentTarget.checked)
								}
								label={label}
								disabled={selectedDate === value}
							/>
						))}
					</Stack>
				</SimpleGrid>
			</Menu.Dropdown>
		</Menu>
	);
}

export default Filter;
