import { useRef, useState, useEffect } from "react";
import {
	Button,
	Checkbox,
	Divider,
	Flex,
	Modal,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core";
import usePartyQueryUpdater from "../../hooks/usePartyQueryUpdater";

import {
	sortOptions,
	dateOptions,
} from "../../shared/options/party-filter.options";
import { priorityOptions } from "../../shared/options/quest-filter.options";
import DateRangePicker from "../../components/input/DateRangePicker";

type FilterModalProps = {
	filterOpened: boolean;
	handleCloseFilter: () => void;
};

function FilterModal({ filterOpened, handleCloseFilter }: FilterModalProps) {
	const { clearAllParams, applyFilters } = usePartyQueryUpdater();

	const callbacksRef = useRef<Record<string, () => void>>({});

	const [filters, setFilters] = useState({
		search: "",
		sortBy: "title",
		filterDate: "created-at",
		priority: "",
		startDate: "",
		endDate: "",
	});

	const clearFilters = () => {
		setFilters({
			search: "",
			sortBy: "title",
			filterDate: "created-at",
			priority: "",
			startDate: "",
			endDate: "",
		});
		clearAllParams();
	};

	const handleSortChange = (value: string) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			sortBy: value,
		}));
	};

	const handleDateChange = (startDate: string, endDate: string) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			startDate,
			endDate,
		}));
	};

	const handlePriorityChange = (value: string) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			priority: value,
		}));
	};

	const clearAllFilters = () => {
		Object.values(callbacksRef.current).forEach((reset) => reset());
		clearAllParams();
		clearFilters();
	};

	// Update callbacksRef when reset functions are needed
	useEffect(() => {
		callbacksRef.current.clearFilters = clearFilters;
	}, []);

	return (
		<Modal
			opened={filterOpened}
			onClose={handleCloseFilter}
			centered
			title="Filters"
		>
			<Stack
				gap={8}
				w="100%"
			>
				<DateRangePicker
					onDateChange={handleDateChange}
					resetCallback={(reset) => {
						callbacksRef.current.dateRange = reset;
					}}
				/>
				<SimpleGrid cols={3}>
					<Stack py={8}>
						<Stack gap={0}>
							<Text>Sort</Text>
							<Divider />
						</Stack>
						{sortOptions.map(({ label, value }) => (
							<Checkbox
								key={value}
								checked={filters.sortBy === value}
								onChange={() => handleSortChange(value)}
								label={label}
								color="violet"
							/>
						))}
					</Stack>

					<Stack py={8}>
						<Stack gap={0}>
							<Text>Date</Text>
							<Divider />
						</Stack>
						{dateOptions.map(({ label, value }) => (
							<Checkbox
								key={value}
								checked={filters.filterDate === value}
								onChange={() => handleDateChange(value, filters.endDate)} 
								label={label}
								color="violet"
							/>
						))}
					</Stack>

					<Stack py={8}>
						<Stack gap={0}>
							<Text>Priority</Text>
							<Divider />
						</Stack>
						{priorityOptions?.map(({ label, value }) => (
							<Checkbox
								key={value}
								checked={filters.priority === value}
								onChange={() => handlePriorityChange(value)}
								color="violet"
								label={label}
							/>
						))}
					</Stack>
				</SimpleGrid>

				<Flex gap={8}>
					<Button
						fullWidth
						color="violet"
						variant="light"
						onClick={() => applyFilters(filters)} 
					>
						Apply Filters
					</Button>
					<Button
						fullWidth
						color="red"
						variant="light"
						onClick={clearAllFilters} 
					>
						Clear Filters
					</Button>
				</Flex>
			</Stack>
		</Modal>
	);
}

export default FilterModal;
