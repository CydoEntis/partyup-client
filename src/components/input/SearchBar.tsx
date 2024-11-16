import { Button, Group, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type SearchBarProps = {
	form: UseFormReturnType<{ search: string }>;
	onSearch: () => void;
};

function SearchBar({ form, onSearch }: SearchBarProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const search = searchParams.get("search") || "";
		if (search !== form.values.search) {
			form.setFieldValue("search", search);
		}
	}, [searchParams]);

	const handleSearch = () => {
		const searchTerm = form.values.search.trim();
		if (searchTerm !== searchParams.get("search")) {
			setSearchParams({ search: searchTerm });
		}
		onSearch();
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
