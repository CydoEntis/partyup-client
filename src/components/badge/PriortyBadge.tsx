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

	const mapPriortyLevelToLabel = (priorityLevel: PriorityLevel) => {
		switch (priorityLevel) {
			case 4:
				return "critical";
			case 3:
				return "high";
			case 2:
				return "medium";
			case 1:
				return "low";
			default:
				return "low";
		}
	};

	const badgeColor = getBadgeColor(priority);

	return (
		<Badge
			variant="light"
			color={badgeColor}
		>
			{mapPriortyLevelToLabel(priority)}
		</Badge>
	);
}

export default PriortyBadge;
