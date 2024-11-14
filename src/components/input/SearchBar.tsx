import { Button, Checkbox, Group, Menu, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Settings2, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {};

const filterOptions = [
	{ label: "Title", value: "title" },
	{ label: "Created", value: "created" },
	{ label: "Last Updated", value: "lastUpdated" },
	{ label: "Due Date", value: "dueDate" },
];

function SearchBar({}: Props) {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [order, setOrder] = useState<"asc" | "desc">("asc");

	const [searchParams, setSearchParams] = useSearchParams();

	// Update query parameters in the URL based on the current state
	const updateQueryParams = () => {
		const params: Record<string, string> = {};

		if (searchTerm) params.search = searchTerm;
		if (selectedFilter) params.filter = selectedFilter;
		if (startDate) params.startDate = startDate.toISOString();
		if (endDate) params.endDate = endDate.toISOString();
		if (order) params.order = order;

		setSearchParams(params);
	};

	// Call updateQueryParams whenever any of the controlled states change
	useEffect(() => {
		updateQueryParams();
	}, [searchTerm, selectedFilter, startDate, endDate, order]);

	// Event handlers
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleFilterChange = (value: string, isChecked: boolean) => {
		setSelectedFilter(isChecked ? value : null);
	};

	const handleDateChange = (date: Date | null, type: "start" | "end") => {
		if (type === "start") {
			setStartDate(date);
		} else {
			setEndDate(date);
		}
	};

	const toggleOrder = () => {
		setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
	};

	return (
		<Group
			pb="16"
			align="end"
		>
			<TextInput
				leftSection={<Search size="20" />}
				value={searchTerm}
				onChange={handleSearchChange}
				placeholder="Search"
			/>
			<Button
				variant="light"
				color="violet"
			>
				Search
			</Button>
			<Menu
				shadow="md"
				width={200}
			>
				<Menu.Target>
					<Button
						variant="light"
						color="violet"
					>
						<Settings2 size={20} />
					</Button>
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
			<DateInput
				value={startDate}
				onChange={(date) => handleDateChange(date, "start")}
				label="Start Date"
				placeholder="Start Date"
			/>
			<DateInput
				value={endDate}
				onChange={(date) => handleDateChange(date, "end")}
				label="End Date"
				placeholder="End Date"
			/>
			<Button
				variant="light"
				color="violet"
				onClick={toggleOrder}
			>
				{order === "asc" ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
			</Button>
		</Group>
	);
}

export default SearchBar;
