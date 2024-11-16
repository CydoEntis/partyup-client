import { DateInput } from "@mantine/dates";
import React, { useState } from "react";

type Props = {};

function DateRangePicker({}: Props) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

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

	return (
		<>
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
		</>
	);
}

export default DateRangePicker;
