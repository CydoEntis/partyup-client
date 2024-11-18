import { DatePickerInput } from "@mantine/dates";
import { Group, Stack, Text, ActionIcon } from "@mantine/core";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

type DateRangePickerProps = {
	onDateChange: (startDate: string, endDate: string) => void;
	resetCallback?: (resetFunction: () => void) => void;
};

function DateRangePicker({
	onDateChange,
	resetCallback,
}: DateRangePickerProps) {
	const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

	const handleFilterDates = () => {
		const [startDate, endDate] = value;
		const stringifiedStartDate = startDate ? startDate.toISOString() : "";
		const stringifiedEndDate = endDate ? endDate.toISOString() : "";
		onDateChange(stringifiedStartDate, stringifiedEndDate);
	};

	// Reset date range
	const resetDateRange = () => {
		setValue([null, null]);
		onDateChange("", "");
	};

	useEffect(() => {
		if (resetCallback) {
			resetCallback(resetDateRange); 
		}
	}, [resetCallback]);

	useEffect(() => {
		handleFilterDates();
	}, [value]);

	return (
		<Group
			align="end"
			w="100%"
		>
			<Stack
				gap={2}
				w="85%"
			>
				<Text size="sm">Select a Date Range</Text>
				<DatePickerInput
					placeholder="Select date range"
					type="range"
					allowSingleDateInRange
					value={value}
					onChange={setValue} // Update value when user selects a date range
				/>
			</Stack>
			<ActionIcon
				size="lg"
				variant="light"
				color="violet"
				onClick={resetDateRange}
			>
				<X />
			</ActionIcon>
		</Group>
	);
}

export default DateRangePicker;
