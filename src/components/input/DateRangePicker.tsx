import { DatePickerInput } from "@mantine/dates";
import { Text } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack } from "@mantine/core";

type Props = {};

function DateRangePicker({}: Props) {
	const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const startDateParam = searchParams.get("startDate");
		const endDateParam = searchParams.get("endDate");

		if (startDateParam || endDateParam) {
			setValue([
				startDateParam ? new Date(startDateParam) : null,
				endDateParam ? new Date(endDateParam) : null,
			]);
		}
	}, [searchParams]);

	const handleDateChange = (selectedRange: [Date | null, Date | null]) => {
		setValue(selectedRange);

		const [startDate, endDate] = selectedRange;

		const updatedParams: Record<string, string> = {};
		if (startDate) updatedParams.startDate = startDate.toISOString();
		if (endDate) updatedParams.endDate = endDate.toISOString();

		setSearchParams({
			...Object.fromEntries(searchParams.entries()),
			...updatedParams,
		});
	};

	return (
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
	);
}

export default DateRangePicker;
