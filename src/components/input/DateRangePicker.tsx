import { DatePickerInput } from "@mantine/dates";
import { Group, Stack, Text, Button } from "@mantine/core";
import { useEffect, useState } from "react";

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
		const stringifiedStartDate = startDate?.toISOString() || "";
		const stringifiedEndDate = endDate?.toISOString() || "";
		onDateChange(stringifiedStartDate, stringifiedEndDate);
	};

	const resetDateRange = () => {
		setValue([null, null]);
		onDateChange("", "");
	};

	useEffect(() => {
		if (resetCallback) {
			resetCallback(resetDateRange);
		}
	}, [resetCallback]);

	return (
		<Group align="end">
			<Stack gap={2}>
				<Text size="sm">Select a Date Range</Text>
				<DatePickerInput
					placeholder="Select date range"
					type="range"
					allowSingleDateInRange
					value={value}
					onChange={setValue}
				/>
			</Stack>
			<Button
				variant="light"
				color="violet"
				onClick={handleFilterDates}
			>
				Filter Dates
			</Button>
		</Group>
	);
}

export default DateRangePicker;
