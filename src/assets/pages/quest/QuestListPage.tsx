import { Container, SimpleGrid } from '@mantine/core';
import QuestCard from '../../../features/quest/QuestCard';

type Props = {}

function QuestListPage({}: Props) {
	return (
		<Container
			fluid
			h="100vh"
		>
			<SimpleGrid cols={6}>
				{Array.from({ length: 10 }).map((_, index) => (
					<QuestCard
						index={index}
						onClick={open}
					/>
				))}
			</SimpleGrid>
		</Container>
	);
}

export default QuestListPage