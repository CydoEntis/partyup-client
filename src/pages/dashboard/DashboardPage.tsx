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

	console.log(userStats);

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
			<Box p={32}>
				<SimpleGrid
					cols={5}
					spacing="sm"
				>
					<Paper
						withBorder
						p={12}
					>
						<Text>Joined Parties</Text>
						<Title>{userStats?.totalParties}</Title>
					</Paper>

					<Paper
						withBorder
						p={12}
					>
						<Text>Total Quests</Text>
						<Title>{userStats?.totalParties}</Title>
					</Paper>

					<Paper
						withBorder
						p={12}
					>
						<Text>In Progress Quests</Text>
						<Title>{userStats?.totalQuests}</Title>
					</Paper>
					<Paper
						withBorder
						p={12}
					>
						<Text>Completed Quests</Text>
						<Title>{userStats?.completedQuests}</Title>
					</Paper>

					<Paper
						withBorder
						p={12}
					>
						<Text>Past Due Quests</Text>
						<Title>{userStats?.pastDueQuests}</Title>
					</Paper>
				</SimpleGrid>
				<Grid pt={16}>
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
							<Title pb={8} size="xl">Your Next Unlock</Title>
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
