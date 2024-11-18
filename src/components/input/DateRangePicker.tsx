import { DatePickerInput } from "@mantine/dates";
import { Text, Stack, Group, Button } from "@mantine/core";
import { useState, useImperativeHandle, forwardRef } from "react";

type DateRangePickerProps = {
	onDateChange: (startDate: string, endDate: string) => void;
};

export interface DateRangePickerHandle {
	reset: () => void;
}

const DateRangePicker = forwardRef(
	({ onDateChange }: DateRangePickerProps, ref) => {
		const [value, setValue] = useState<[Date | null, Date | null]>([
			null,
			null,
		]);

		useImperativeHandle(ref, () => ({
			reset: () => {
				setValue([null, null]);
				onDateChange("", "");
			},
		}));

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
	},
);

export default DateRangePicker;
