import PageFooter from "../../../components/footer/PageFooter";
import { Pagination } from "@mantine/core";

type PartyListFooterProps = {
	totalPages: number;
	onPageChange: (page: number) => void;
	page: number;
};

function PartyListFooter({
	totalPages,
	page,
	onPageChange,
}: PartyListFooterProps) {
	return (
		<PageFooter>
			<>
				{totalPages > 1 ? (
					<Pagination
						total={totalPages || 1}
						value={page}
						onChange={onPageChange}
						color="violet"
					/>
				) : null}
			</>
		</PageFooter>
	);
}

export default PartyListFooter;
