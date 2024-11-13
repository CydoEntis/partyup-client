import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserStats } from "../../shared/types/auth.types";
import { AreaChart } from "@mantine/charts";
import {
	Box,
	Paper,
	SimpleGrid,
	Title,
	Text,
	Grid,
	Flex,
	Group,
	Divider,
} from "@mantine/core";
import NextUnlock from "../../components/avatar/NextAvatarUnlock";
import useUserStore from "../../stores/useUserStore";
import DashboardStats from "../../features/dashboard/DashboardStats";

type Props = {};

function DashboardPage({}: Props) {
	const { user } = useUserStore();
	const [userStats, setUserStats] = useState<UserStats>();

	useEffect(() => {
		const fetchUserStats = async () => {
			const stats = await userService.getUserStats();
			setUserStats(stats);
		};

		fetchUserStats();
	}, []);

	if(!userStats) return;

	return (
		<>
			<Box
				bg="secondary"
				p={16}
			>
				<Flex
					justify="space-between"
					align="center"
					w="100%"
					pb={16}
				>
					<Group
						align="center"
						w="100%"
						justify="space-between"
					>
						<Group>
							<Title size="2.5rem">Dashboard</Title>
						</Group>
					</Group>
				</Flex>
			</Box>
			<DashboardStats stats={userStats!} />
			<Box>
				<Grid>
					<Grid.Col span={8}>
						<Paper
							style={{ height: "100%" }}
							p={16}
						>
							<AreaChart
								data={userStats?.questsCompletedByDay || []}
								dataKey="date"
								h={400}
								series={[
									{
										name: "questCount",
										label: "Completed Quests",
										color: "violet.6",
									},
								]}
								curveType="linear"
								gridAxis="xy"
							/>
						</Paper>
					</Grid.Col>
					<Grid.Col span={4}>
						<Paper
							withBorder
							style={{ height: "100%" }}
							p={16}
						>
							<Title
								pb={8}
								size="xl"
							>
								Your Next Unlock
							</Title>
							<Divider pb={8} />
							<NextUnlock user={user!} />
						</Paper>
					</Grid.Col>
				</Grid>
			</Box>
		</>
	);
}

export default DashboardPage;
