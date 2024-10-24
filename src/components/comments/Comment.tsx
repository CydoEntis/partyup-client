import { Avatar, Flex, Stack, Title, Text } from '@mantine/core';

type Props = {}

function Comment({}: Props) {
	return (
		<Flex gap={16}>
			<Avatar size="lg" />
			<Stack gap={4}>
				<Title
					size="lg"
					c="gray"
				>
					Book Simmons
				</Title>
				<Text size="md">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
					perspiciatis suscipit architecto itaque explicabo perferendis, commodi
					temporibus neque! Ipsum unde aliquid tempore non adipisci illum ipsam.
					Reprehenderit provident pariatur voluptatum!
				</Text>
			</Stack>
		</Flex>
	);
}

export default Comment