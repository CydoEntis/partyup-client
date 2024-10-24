import { Stack, Title, ScrollArea } from '@mantine/core';
import Comment from './Comment';

type Props = {}

function CommentList({}: Props) {
	return (
		<Stack>
			<Title size="xl">Comments</Title>
			<ScrollArea
				h={350}
				type="always"
				
			>
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
				<Comment />
			</ScrollArea>
		</Stack>
	);
}

export default CommentList