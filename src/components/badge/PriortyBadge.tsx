import { PriorityLevel } from "../../shared/types/prioty.types";
import { Badge } from "@mantine/core";

type PriorityBadgeProps = {
	priority: PriorityLevel;
};

function PriortyBadge({ priority }: PriorityBadgeProps) {
	const getBadgeColor = (priority: PriorityLevel) => {
		switch (priority) {
			case PriorityLevel.CRITICAL:
				return "red";
			case PriorityLevel.HIGH:
				return "orange";
			case PriorityLevel.MEDIUM:
				return "yellow";
			case PriorityLevel.LOW:
			default:
				return "cyan";
		}
	};

	const badgeColor = getBadgeColor(priority);

	return (
		<Badge
			variant="light"
			color={badgeColor}
		>
			{priority}
		</Badge>
	);
}

export default PriortyBadge;
