import { Button, Group, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Search } from "lucide-react";

type SearchBarProps = {
	form: UseFormReturnType<{ search: string }>;
	onSearch: (search: string) => void;
};

function SearchBar({ form, onSearch }: SearchBarProps) {


	const handleSearch = (values: { search: string }) => {
		const searchTerm = values.search.trim();
		onSearch(searchTerm);
	};

	return (
		<form onSubmit={form.onSubmit(handleSearch)}>
			<Group gap={8}>
				<TextInput
					leftSection={<Search size="20" />}
					{...form.getInputProps("search")}
					placeholder="Search"
				/>
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
