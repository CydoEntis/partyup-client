import { Button, Checkbox, Group, Menu, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Settings2, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import useQuestStore from "../../stores/useQuestStore";

const filterOptions = [
	{ label: "Title", value: "title" },
	{ label: "Created", value: "created" },
	{ label: "Last Updated", value: "lastUpdated" },
	{ label: "Due Date", value: "dueDate" },
];

function QuestSearchBar() {
	const { getQuests } = useQuestStore();
	const { partyId } = useParams();

	const [selectedFilter, setSelectedFilter] = useState<string | null>(
		"created",
	);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [order, setOrder] = useState<"asc" | "desc">("desc");

	const [searchParams, setSearchParams] = useSearchParams();

	// Reset filters when the partyId changes
	useEffect(() => {
		setSelectedFilter("created");
		setSearchTerm("");
		setStartDate(null);
		setEndDate(null);
		setOrder("desc");
	}, [partyId]);

	useEffect(() => {
		const currentParams = Object.fromEntries(searchParams.entries());

		// Update currentParams with new values
		const params: Record<string, string> = { ...currentParams };
		if (searchTerm) params.search = searchTerm;
		else delete params.search;

		if (selectedFilter) params.filter = selectedFilter;
		else delete params.filter;

		if (startDate) params.startDate = startDate.toISOString();
		else delete params.startDate;

		if (endDate) params.endDate = endDate.toISOString();
		else delete params.endDate;

		if (order) params.order = order;

		setSearchParams(params);
	}, [searchTerm, selectedFilter, startDate, endDate, order, setSearchParams]);

	useEffect(() => {
		const params: Record<string, string> = {};

		if (searchParams.has("search")) params.search = searchParams.get("search")!;
		if (searchParams.has("filter")) params.filter = searchParams.get("filter")!;
		if (searchParams.has("startDate"))
			params.startDate = searchParams.get("startDate")!;
		if (searchParams.has("endDate"))
			params.endDate = searchParams.get("endDate")!;
		if (searchParams.has("order")) params.order = searchParams.get("order")!;

		if (partyId) {
			getQuests(partyId, params);
		}
	}, [searchParams, partyId, getQuests]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleFilterChange = (value: string, isChecked: boolean) => {
		setSelectedFilter(isChecked ? value : null);
	};

	const handleDateChange = (date: Date | null, type: "start" | "end") => {
		if (date) {
			const updatedDate = new Date(date);
			if (type === "start") {
				updatedDate.setHours(0, 0, 0, 0);
				setStartDate(updatedDate);
			} else {
				updatedDate.setHours(23, 59, 59, 999);
				setEndDate(updatedDate);
			}
		} else {
			if (type === "start") setStartDate(null);
			else setEndDate(null);
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

export default QuestSearchBar;
