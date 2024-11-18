import { ActionIcon, Flex, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import PageHeader from "../../../components/header/PageHeader";
import SearchBar from "../../../components/input/SearchBar";
import LayoutOptions from "../../../components/layout/LayoutOptions";

import { useDisclosure } from "@mantine/hooks";
import PartyFilterModal from "../../filters/PartyFilterModal";
import { useRef } from "react";
import { Settings2 } from "lucide-react";
import usePartyQueryUpdater from "../../../hooks/usePartyQueryUpdater";

function PartyListHeader() {
	const form = useForm<{ search: string }>({
		initialValues: { search: "" },
	});

	const { handleSearch, clearSearchParam } = usePartyQueryUpdater();

	const callbacksRef = useRef<Record<string, () => void>>({});

	const [isFilterOpened, { open: openFilters, close: closeFilters }] =
		useDisclosure(false);

	const handleSearchSubmit = () => {
		handleSearch(form.values.search);
	};

	return (
		<>
			<PartyFilterModal
				filterOpened={isFilterOpened}
				handleCloseFilterModal={closeFilters}
			/>
			<PageHeader title="Joined Parties">
				<Flex
					align="end"
					justify="space-between"
				>
					<Group align="end">
						<SearchBar
							form={form}
							onSearch={handleSearchSubmit}
							onClear={clearSearchParam}
							resetCallback={(reset) => {
								callbacksRef.current.search = reset;
							}}
						/>
						<ActionIcon
							size="lg"
							variant="light"
							color="violet"
							onClick={openFilters}
						>
							<Settings2 size={20} />
						</ActionIcon>
					</Group>
					<LayoutOptions />
				</Flex>
			</PageHeader>
		</>
	);
}

export default PartyListHeader;
