import { useEffect } from "react";
import { Button, Group, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Search } from "lucide-react";
import { useQueryParams } from "../../hooks/useQueryParams";

type SearchBarProps = {
	form: UseFormReturnType<{ search: string }>;
	onSearch: (search: string) => void;
};

function SearchBar({ form, onSearch }: SearchBarProps) {
	const { getSearchParams } = useQueryParams();

	useEffect(() => {
		const params = getSearchParams();

		if (!params.search) {
			form.setFieldValue("search", "");
		}
	}, [getSearchParams().search]); 

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
