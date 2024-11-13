import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserStats } from "../../shared/types/auth.types";

type Props = {};

function DashboardPage({}: Props) {
	const [userStats, setUserStats] = useState<UserStats>();
	useEffect(() => {
		const fetchUserStats = async () => {
			const stats = await userService.getUserStats();
			setUserStats(stats);
		};
	}, []);

	return <div>Dashboard</div>;
}

export default DashboardPage;
