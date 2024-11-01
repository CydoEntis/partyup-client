import { Skeleton, Group, Flex, Box } from "@mantine/core"; // Adjust the import based on your actual library

const CampaignHeaderSkeleton = () => {
	return (
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
						<Skeleton
							height={40}
							width={200}
							radius="xl"
						/>{" "}
						<Skeleton
							height={40}
							width={40}
							circle
						/>{" "}
					</Group>
					<Skeleton
						height={40}
						width={100}
						radius="xl"
					/>{" "}
				</Group>
			</Flex>
			<Flex>
				<Flex w={500} gap={8}>
					<Skeleton
						w={600}
						height={40}
						radius="xl"
					/>
					<Skeleton
					w={400}
						height={40}
						radius="xl"
					/>
					<Skeleton
						w={200}
						height={40}
						radius="xl"
					/>
				</Flex>
			</Flex>
		</Box>
	);
};

export default CampaignHeaderSkeleton;
