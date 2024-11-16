import { ActionIcon } from "@mantine/core";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Props = {};

function OrderSwitch({}: Props) {
	const [order, setOrder] = useState<"asc" | "desc">("desc");

	const toggleOrder = () => {
		setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
	};

	return (
		<ActionIcon
			size="lg"
			variant="light"
			color="violet"
			onClick={toggleOrder}
		>
			{order === "asc" ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
		</ActionIcon>
	);
}

export default OrderSwitch;
