import {
	ActionIcon,
	Checkbox,
	Menu,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { Settings2 } from "lucide-react";
import { useEffect, useState } from "react";

type FilterProps = {
	sortOptions: Record<string, string>[];
	dateOptions: Record<string, string>[];
	priorityOptions?: Record<string, string>[];
	handleDateFiltering: (filter: string) => void;
	handleSorting: (filter: string) => void;
	handlePriority?: (filter: string) => void; // Fix the typo here to handlePriority
	resetCallback?: (resetFunction: () => void) => void;
};

function Filter({
	sortOptions,
	dateOptions,
	priorityOptions,
	handleSorting,
	handleDateFiltering,
	handlePriority, // Fix the typo here
	resetCallback,
}: FilterProps) {
	const [selectedSort, setSelectedSort] = useState<string | null>("title");
	const [selectedDate, setSelectedDate] = useState<string | null>("created-at");
	const [selectedPriority, setSelectedPriority] = useState<string | null>("");

	const handleSortChange = (value: string, isChecked: boolean) => {
		if (isChecked || selectedDate) {
			setSelectedSort(isChecked ? value : selectedSort);
			handleSorting(isChecked ? value : selectedSort!);
		}
	};

	const handleDateChange = (value: string, isChecked: boolean) => {
		if (isChecked || selectedSort) {
			setSelectedDate(isChecked ? value : selectedDate);
			handleDateFiltering(isChecked ? value : selectedDate!);
		}
	};

	const handlePriorityChange = (value: string, isChecked: boolean) => {
		if (isChecked || selectedPriority) {
			setSelectedPriority(isChecked ? value : selectedPriority);
			if (handlePriority) {
				handlePriority(isChecked ? value : selectedPriority!); // Check if handlePriority is defined
			}
		}
	};

	const resetFilters = () => {
		setSelectedSort("title");
		setSelectedDate("created-at");
		setSelectedPriority("");

		// Trigger parent handlers with defaults
		handleSorting("title");
		handleDateFiltering("created-at");
		if (handlePriority) {
			handlePriority(""); // Check if handlePriority is defined before calling
		}
	};

	useEffect(() => {
		if (resetCallback) {
			resetCallback(resetFilters);
		}
	}, [resetCallback]);

	return (
		<Menu
			shadow="md"
			width={450}
		>
			<Tooltip label="Filter">
				<Menu.Target>
					<ActionIcon
						size="lg"
						variant="light"
						color="violet"
					>
						<Settings2 size={20} />
					</ActionIcon>
				</Menu.Target>
			</Tooltip>

			<Menu.Dropdown p={8}>
				<Text
					size="xs"
					ta="center"
				>
					Search Filters
				</Text>
				<SimpleGrid cols={3}>
					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Sort</Menu.Label>
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

					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Date</Menu.Label>
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

					<Stack py={8}>
						<Stack gap={0}>
							<Menu.Label>Priority</Menu.Label>
							<Menu.Divider />
						</Stack>
						{priorityOptions?.map(({ label, value }) => (
							<Checkbox
								key={value}
								checked={selectedPriority === value}
								onChange={(event) =>
									handlePriorityChange(value, event.currentTarget.checked)
								}
								color="violet"
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
