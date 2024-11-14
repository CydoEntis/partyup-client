import { useEffect } from "react";
import useQuestStore from "../../stores/useQuestStore";
import { useParams } from "react-router-dom";
import {
	Box,
	Paper,
	Title,
	Text,
	SimpleGrid,
	Avatar,
	Stack,
	Group,
} from "@mantine/core";
import UserAvatar from "../../components/avatar/UserAvatar";
import PriortyBadge from "../../components/badge/PriortyBadge";
import StepList from "../../components/steps/StepList";

type Props = {};

function QuestPage({}: Props) {
	const {
		quest,
		getQuest,
		loading: { detail: loadingDetails },
	} = useQuestStore();
	const { partyId, questId } = useParams();
	useEffect(() => {
		const fetchQuest = async () => {
			if (partyId && questId) {
				await getQuest(partyId, questId);
			}
		};

		fetchQuest();
	}, [partyId, questId]);

	if (!quest || loadingDetails) return <p>Loading...</p>;

	return (
		<Box p={32}>
			<SimpleGrid cols={2}>
				<Paper
					withBorder
					p={16}
				>
					<PriortyBadge priority={quest.priority} />
					<Title>{quest.title}</Title>
					<Text size="xl">{quest.description}</Text>
					<StepList
						title="Steps to Complete"
						quest={quest}
					/>
				</Paper>
				<Paper
					withBorder
					p={16}
				>
					<Stack gap={8}>
						{quest.members.map((member) => (
							<Group
								align="center"
								gap={8}
							>
								<UserAvatar
									size="md"
									avatar={member.avatar}
								/>
								<Text>{member.displayName}</Text>
							</Group>
						))}
					</Stack>
				</Paper>
			</SimpleGrid>
		</Box>
	);
}

export default QuestPage;
