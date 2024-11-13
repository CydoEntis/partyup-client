import { Box, SimpleGrid } from "@mantine/core";
import AnalyticsCard from "../../components/card/AnalyticsCard";
import { UserStats } from "../../shared/types/auth.types";

type DashboardStatsProps = {
	stats: UserStats;
};

function DashboardStats({ stats }: DashboardStatsProps) {
	return (
		<Box p={32}>
			<SimpleGrid
				cols={5}
				spacing="sm"
			>
				<AnalyticsCard
					color="violet"
					text="Joined Parties"
					stat={stats.totalParties}
				/>
				<AnalyticsCard
					color="cyan"
					text="Assigned Quests"
					stat={stats.totalQuests}
				/>
				<AnalyticsCard
					color="yellow"
					text="In Progress Quests"
					stat={stats.inProgressQuests}
				/>
				<AnalyticsCard
					color="lime"
					text="Completed Quests"
					stat={stats.completedQuests}
				/>
				<AnalyticsCard
					color="red"
					text="Past Due Quests"
					stat={stats.pastDueQuests}
				/>
			</SimpleGrid>
		</Box>
	);
}

export default DashboardStats;
