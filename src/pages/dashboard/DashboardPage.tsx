import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { QuestCompletionByDay, UserStats } from "../../shared/types/auth.types";
import { AreaChart } from "@mantine/charts";
import { Paper } from "@mantine/core";

type Props = {};

function DashboardPage({}: Props) {
	const [userStats, setUserStats] = useState<UserStats>();

	useEffect(() => {
		const fetchUserStats = async () => {
			const stats = await userService.getUserStats();
			setUserStats(stats);
		};

		fetchUserStats();
	}, []);


	return (
		<Paper p={32} py={16} w={1250} mt={40}>
			<AreaChart
				h={400}
				w={1200}
				data={userStats?.questsCompletedByDay || []}
				dataKey="date"
				series={[{ name: "questCount", label: "Completed Quests", color: "violet.6" }]}
				curveType="linear"
				gridAxis="xy"
			/>
		</Paper>
	);
}

export default DashboardPage;
