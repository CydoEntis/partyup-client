import { useEffect, useState } from "react";
import { Paper, Title, Text, Flex, Stack } from "@mantine/core";

type AnalyticsCardProps = {
	text: string;
	stat: number;
	color: string;
};

function AnalyticsCard({ text, stat, color }: AnalyticsCardProps) {
	const [displayStat, setDisplayStat] = useState(0);

	useEffect(() => {
		let start = 0;
		const duration = 1000; // 1 second animation
		const increment = stat / (duration / 10); // adjust rate of increment
		const interval = setInterval(() => {
			start += increment;
			if (start >= stat) {
				clearInterval(interval);
				setDisplayStat(stat); // set to the final stat to avoid overcounting
			} else {
				setDisplayStat(Math.floor(start));
			}
		}, 10);

		return () => clearInterval(interval); // clean up interval on unmount
	}, [stat]);

	return (
		<Paper
			withBorder
			p={12}
			h={200}
		>
			<Stack
				justify="center"
				align="center"
				h="100%"
				gap={2}
			>
				<Text size="xl">{text}</Text>
				<Title
					c={color}
					size="3rem"
				>
					{displayStat}
				</Title>
			</Stack>
		</Paper>
	);
}

export default AnalyticsCard;
