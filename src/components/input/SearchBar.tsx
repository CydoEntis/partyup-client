import { Button, Group, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type SearchBarProps = {
	form: UseFormReturnType<{ search: string }>;
};

function SearchBar({ form }: SearchBarProps) {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const search = searchParams.get("search") || "";
		form.setFieldValue("search", search);
	}, [searchParams, form]);

	const handleSearch = () => {
		const searchTerm = form.values.search.trim();
		setSearchParams({ search: searchTerm });
	};

	return (
		<Group gap={8}>
			<TextInput
				leftSection={<Search size="20" />}
				{...form.getInputProps("search")}
				placeholder="Search"
			/>
			<Button
				variant="light"
				color="violet"
				onClick={handleSearch}
			>
				Search
			</Button>
		</Group>
	);
}

export default SearchBar;
