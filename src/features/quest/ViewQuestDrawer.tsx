import {
	Drawer,
	Flex,
	Title,
	Stack,
	Button,
	Badge,
	Text,
	Box,
} from "@mantine/core";
import CommentList from "../../components/comments/CommentList";
import TaskList from "../../components/tasks/TaskList";
import { Check, Clock, X } from "lucide-react";
import { DrawerProps } from "../../shared/types/drawer.types";

function ViewQuestDrawer({ isOpened, onClose }: DrawerProps) {
	return (
		<Drawer
			size="xl"
			opened={isOpened}
			onClose={onClose}
			position="right"
		>
			<Box
				px={32}
				h="100%"
			>
				<Flex
					direction="column"
					justify="space-between"
					className="min-h-[calc(100vh-70px)]"
				>
					<Box>
						<Title size="2rem">Set Up Pi 5 Server</Title>
						<Flex
							justify="space-between"
							py={16}
						>
							<Badge
								variant="light"
								color="yellow"
								size="lg"
							>
								Urgent
							</Badge>

							<Badge
								size="lg"
								variant="outline"
								color="gray"
								leftSection={<Clock size={16} />}
							>
								Nov 22, 2024
							</Badge>
						</Flex>

						<Stack py={16}>
							<Title size="xl">Description</Title>
							<Text>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
								iste ducimus culpa tenetur necessitatibus velit ut. Accusantium
								impedit eligendi saepe, ducimus incidunt iure eveniet nulla
								commodi fugit voluptatum nesciunt pariatur.
							</Text>
						</Stack>

						{/* Tasks Section */}
						<Stack>
							<TaskList
								title="Tasks"
								tasks={[]}
							/>
						</Stack>
					</Box>

					{/* Bottom Section (Comments pinned to bottom) */}
					<Box>
						<CommentList />
						<Flex
							gap={8}
							w="100%"
							py={32}
						>
							<Button
								leftSection={<Check size={20} />}
								variant="light"
								size="md"
								fullWidth
								color="violet"
							>
								Complete
							</Button>
							<Button
								leftSection={<X size={20} />}
								variant="light"
								size="md"
								fullWidth
								color="gray"
							>
								Cancel
							</Button>
						</Flex>
					</Box>
				</Flex>
			</Box>
		</Drawer>
	);
}

export default ViewQuestDrawer;
