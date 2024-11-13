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
	Stack,
} from "@mantine/core";
import NextUnlock from "../../components/avatar/NextAvatarUnlock";
import useUserStore from "../../stores/useUserStore";
import DashboardStats from "../../features/dashboard/DashboardStats";
import UserProgression from "../../features/dashboard/UserProgression";

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

	if (!userStats && user) return;

	return (
		<>
			<Box
				bg="secondary"
				p={32}
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
						<Stack gap={4}>
							<Title size="lg">Your Dashboard</Title>
							<Title size="2.5rem">Welcome, {user?.displayName}</Title>
						</Stack>
					</Group>
				</Flex>
			</Box>
			<Stack gap={32} p={32}>
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
									h={300}
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
							{user ? <UserProgression user={user} /> : <p>Loading...</p>}
						</Grid.Col>
					</Grid>
				</Box>
			</Stack>
		</>
	);
}

export default DashboardPage;
