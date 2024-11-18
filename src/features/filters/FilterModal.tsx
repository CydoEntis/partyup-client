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
import { useForm } from "@mantine/form";
import DateRangePicker from "../../components/input/DateRangePicker";
import usePartyQueryUpdater from "../../hooks/usePartyQueryUpdater";

type FilterModalProps = {
	filterOpened: boolean;
	handleCloseFilterModal: () => void;
	sortOptions?: Array<{ label: string; value: string }>;
	dateOptions?: Array<{ label: string; value: string }>;
	orderOptions?: Array<{ label: string; value: string }>;
	priorityOptions?: Array<{ label: string; value: string }>;
	onApplyFilters: (filters: Record<string, any>) => void;
	onClearFilters: () => void;
};

function FilterModal({
	filterOpened,
	handleCloseFilterModal,
	sortOptions,
	dateOptions,
	orderOptions,
	priorityOptions,
	onApplyFilters,
	onClearFilters,
}: FilterModalProps) {
	const form = useForm({
		initialValues: {
			sortBy: "title",
			filterDate: "created-at",
			priority: "",
			startDate: "",
			endDate: "",
			orderBy: "desc",
		},
	});

	const handleApplyFilters = (values: typeof form.values) => {
		onApplyFilters(values);
	};

	const handleClearFilters = () => {
		form.reset();
		onClearFilters();
		form.onSubmit(handleApplyFilters);
	};

	return (
		<Modal
			opened={filterOpened}
			onClose={handleCloseFilterModal}
			centered
			title="Filters"
			size="lg"
		>
			<form
				onSubmit={form.onSubmit(handleApplyFilters)} // Use the form's onSubmit handler
				onReset={handleClearFilters} // Trigger the reset
			>
				<Stack
					gap={8}
					w="100%"
				>
					<DateRangePicker
						onDateChange={(startDate, endDate) =>
							form.setValues({ startDate, endDate })
						}
					/>
					<SimpleGrid cols={4}>
						{sortOptions && (
							<Stack py={8}>
								<Stack gap={0}>
									<Text>Sort</Text>
									<Divider />
								</Stack>
								{sortOptions.map(({ label, value }) => (
									<Checkbox
										key={value}
										checked={form.values.sortBy === value}
										onChange={() => form.setFieldValue("sortBy", value)}
										label={label}
										color="violet"
									/>
								))}
							</Stack>
						)}

						{dateOptions && (
							<Stack py={8}>
								<Stack gap={0}>
									<Text>Date</Text>
									<Divider />
								</Stack>
								{dateOptions.map(({ label, value }) => (
									<Checkbox
										key={value}
										checked={form.values.filterDate === value}
										onChange={() => form.setFieldValue("filterDate", value)}
										label={label}
										color="violet"
									/>
								))}
							</Stack>
						)}

						{priorityOptions && (
							<Stack py={8}>
								<Stack gap={0}>
									<Text>Priority</Text>
									<Divider />
								</Stack>
								{priorityOptions.map(({ label, value }) => (
									<Checkbox
										key={value}
										checked={form.values.priority === value}
										onChange={() => form.setFieldValue("priority", value)}
										label={label}
										color="violet"
									/>
								))}
							</Stack>
						)}

						{orderOptions && (
							<Stack py={8}>
								<Stack gap={0}>
									<Text>Order</Text>
									<Divider />
								</Stack>
								{orderOptions.map(({ label, value }) => (
									<Checkbox
										key={value}
										checked={form.values.orderBy === value}
										onChange={() => form.setFieldValue("orderBy", value)}
										label={label}
										color="violet"
									/>
								))}
							</Stack>
						)}
					</SimpleGrid>

					<Flex gap={8}>
						<Button
							fullWidth
							color="violet"
							variant="light"
							type="submit"
						>
							Apply Filters
						</Button>
						<Button
							fullWidth
							color="red"
							variant="light"
							type="reset"
						>
							Clear Filters
						</Button>
					</Flex>
				</Stack>
			</form>
		</Modal>
	);
}

export default FilterModal;
