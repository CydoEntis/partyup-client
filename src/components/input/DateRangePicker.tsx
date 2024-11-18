import { DatePickerInput } from "@mantine/dates";
import { Group, Text, ActionIcon, Input } from "@mantine/core";
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
		<div>
			<Text
				size="sm"
				mb={4}
			>
				Select a Date Range
			</Text>
			<Input.Wrapper>
				<Group>
					<DatePickerInput
						placeholder="Select date range"
						type="range"
						allowSingleDateInRange
						value={value}
						onChange={setValue}
						style={{ flex: 1 }}
					/>
					<ActionIcon
						size="lg"
						variant="light"
						color="violet"
						onClick={resetDateRange}
						style={{ marginLeft: 8 }}
					>
						<X />
					</ActionIcon>
				</Group>
			</Input.Wrapper>
		</div>
	);
}

export default DateRangePicker;
