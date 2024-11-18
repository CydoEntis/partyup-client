import {
	Button,
	Group,
	Stack,
	TextInput,
	Text,
	ActionIcon,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Search, X } from "lucide-react";
import { useEffect } from "react";

type SearchBarProps = {
	form: UseFormReturnType<{ search: string }>;
	onSearch: (search: string) => void;
	onClear: () => void;
	resetCallback?: (resetFunction: () => void) => void;
};

function SearchBar({ form, onSearch, resetCallback, onClear}: SearchBarProps) {
	const handleSearch = (values: { search: string }) => {
		const searchTerm = values.search.trim();
		onSearch(searchTerm);
	};

	const resetSearch = () => {
		form.setFieldValue("search", "");
		onSearch("");
		onClear();
	};

	useEffect(() => {
		if (resetCallback) {
			resetCallback(resetSearch);
		}
	}, [resetCallback]);

	return (
		<form onSubmit={form.onSubmit(handleSearch)}>
			<Group
				gap={8}
				align="end"
			>
				<Stack gap={2}>
					<Text size="sm">Search</Text>
					<TextInput
						leftSection={<Search size="20" />}
						rightSection={
							form.values.search && (
								<ActionIcon
									variant="light"
									color="violet"
									onClick={resetSearch}
								>
									<X size={18} />
								</ActionIcon>
							)
						}
						{...form.getInputProps("search")}
						placeholder="Search by title"
					/>
				</Stack>
				<Button
					variant="light"
					color="violet"
					type="submit"
				>
					Search
				</Button>
			</Group>
		</form>
	);
}

export default SearchBar;
