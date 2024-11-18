import { Button, Group, Stack, TextInput, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Search } from "lucide-react";
import { useEffect } from "react";

type SearchBarProps = {
	form: UseFormReturnType<{ search: string }>;
	onSearch: (search: string) => void;
	resetCallback?: (resetFunction: () => void) => void;
};

function SearchBar({ form, onSearch, resetCallback }: SearchBarProps) {
	const handleSearch = (values: { search: string }) => {
		const searchTerm = values.search.trim();
		onSearch(searchTerm);
	};

	const resetSearch = () => {
		form.setFieldValue("search", "");
		onSearch("");
	};

	useEffect(() => {
		if (resetCallback) {
			resetCallback(resetSearch);
		}
	}, [resetCallback]);

	return (
		<form onSubmit={form.onSubmit(handleSearch)}>
			<Group gap={8} align="end">
				<Stack gap={2}>
					<Text size="sm">Search</Text>
					<TextInput
						leftSection={<Search size="20" />}
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
