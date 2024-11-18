import { DatePickerInput } from "@mantine/dates";
import { Text, Stack, Group, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useQueryParams } from "../../hooks/useQueryParams";

type DateRangePickerProps = {
	onDateChange: (startDate: string, endDate: string) => void;
};

function DateRangePicker({ onDateChange }: DateRangePickerProps) {
	const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
	const { getSearchParams } = useQueryParams();

	useEffect(() => {
		const params = getSearchParams();

		if (!params.startDate && !params.endDate) {
			setValue([null, null]);
		}
	}, [getSearchParams().startDate, getSearchParams().endDate]); 

	const handleDateChange = (selectedRange: [Date | null, Date | null]) => {
		setValue(selectedRange);
	};

	const handleFilterDates = () => {
		if (value) {
			const [startDate, endDate] = value;
			const stringifiedStartDate = startDate?.toISOString() || "";
			const stringifiedEndDate = endDate?.toISOString() || "";

			onDateChange(stringifiedStartDate, stringifiedEndDate);
		}
	};

	return (
		<Group align="end">
			<Stack gap={2}>
				<Text size="sm">Select a Date Range</Text>
				<DatePickerInput
					placeholder="Select date range"
					type="range"
					allowSingleDateInRange
					value={value}
					onChange={handleDateChange}
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
