import { Checkbox, ScrollArea, Stack, Title } from "@mantine/core";
import React from "react";
import { Task } from "../../shared/types/quest.types";

type TaskListProps = {
	title: string;
	tasks: Task[];
};

function TaskList({ title, tasks }: TaskListProps) {
	return (
		<>
			<Title size="xl">{title}</Title>
			<ScrollArea
				h={250}
				type="scroll"
			>
				<Checkbox.Group>
					<Stack>
						{tasks.map((task) => (
							<Checkbox
								color="violet"
								size="md"
								value={task.description}
								label={task.description}
								checked={task.isCompleted}
							/>
						))}
					</Stack>
				</Checkbox.Group>
			</ScrollArea>
		</>
	);
}

export default TaskList;
