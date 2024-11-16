import PageFooter from "../../../components/footer/PageFooter";
import { Pagination } from "@mantine/core";

type PartyFooterProps = {
	totalPages: number;
	onPageChange: (page: number) => void;
	page: number;
};

function PartyFooter({ totalPages, page, onPageChange }: PartyFooterProps) {
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

export default PartyFooter;
