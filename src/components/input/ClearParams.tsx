import { ActionIcon, Tooltip } from "@mantine/core";
import { X } from "lucide-react";

type ClearParamsProps = {
	onClear: () => void;
};

function ClearParams({ onClear }: ClearParamsProps) {
	return (
		<Tooltip label="Clear Filter">
			<ActionIcon
				variant="light"
				size="lg"
				color="violet"
				onClick={onClear}
			>
				<X size={20} />
			</ActionIcon>
		</Tooltip>
	);
}

export default ClearParams;
