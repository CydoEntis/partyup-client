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
import {
	sortOptions,
	dateOptions,
	orderOptions,
} from "../../shared/options/party-filter.options";
import usePartyQueryUpdater from "../../hooks/usePartyQueryUpdater";

type FilterModalProps = {
	filterOpened: boolean;
	handleCloseFilterModal: () => void;
};

function FilterModal({
	filterOpened,
	handleCloseFilterModal,
}: FilterModalProps) {
	const { clearAllFilterParams, applyFilters } = usePartyQueryUpdater();

	const form = useForm({
		initialValues: {
			sortBy: "title",
			filterDate: "created-at",
			priority: "",
			startDate: "",
			endDate: "",
			orderBy: "desc"
		},
	});

	const handleApplyFilters = (values: typeof form.values) => {
		applyFilters(values);
		handleCloseFilterModal();
	};

	const clearAllFilters = () => {
		form.reset();
		clearAllFilterParams();
		handleCloseFilterModal();
	};

	return (
		<Modal
			opened={filterOpened}
			onClose={handleCloseFilterModal}
			centered
			title="Filters"
		>
			<form
				onSubmit={form.onSubmit((values) => handleApplyFilters(values))}
				onReset={clearAllFilters}
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
					<SimpleGrid cols={3}>
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
