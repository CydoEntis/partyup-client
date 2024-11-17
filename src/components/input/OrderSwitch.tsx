import { ActionIcon, Tooltip } from "@mantine/core";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type OrderSwitchProps = {
	onOrderBy: (order: string) => void
};

function OrderSwitch({onOrderBy}: OrderSwitchProps) {
	const [order, setOrder] = useState<"asc" | "desc">("desc");

	const toggleOrder = () => {
		setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
		onOrderBy(order);
	};

	return (
		<Tooltip label="Order By">
			<ActionIcon
				size="lg"
				variant="light"
				color="violet"
				onClick={toggleOrder}
			>
				{order === "asc" ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
			</ActionIcon>
		</Tooltip>
	);
}

export default OrderSwitch;
