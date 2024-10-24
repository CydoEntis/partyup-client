import { SimpleGrid } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
	cols: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	children: ReactNode;
};

function SimpleGridLayout({ cols, children }: Props) {
	return <SimpleGrid cols={cols}>{children}</SimpleGrid>;
}

export default SimpleGridLayout;
