import { Checkbox, ScrollArea, Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Task } from "../../shared/types/quest.types";

type TaskListProps = {
	title: string;
	tasks: Task[];
};

function TaskList({ title, tasks }: TaskListProps) {
	const [tasksList, setTasksList] = useState<Task[]>([]);

	// Update tasksList whenever tasks prop changes
	useEffect(() => {
		setTasksList(tasks);
	}, [tasks]);

	const handleTaskUpdate = (id: number, completed: boolean) => {
		setTasksList((prevTasks) =>
			prevTasks.map((task) =>
				task.id === id ? { ...task, isCompleted: completed } : task,
			),
		);
	};

	return (
		<>
			<Title size="xl">{title}</Title>
			<ScrollArea
				h={250}
				type="scroll"
			>
				<Stack>
					{tasksList.map(
						(
							task, // Use tasksList instead of tasks
						) => (
							<Checkbox
								key={task.id}
								color="violet"
								size="md"
								value={task.id.toString()}
								label={task.description}
								checked={task.isCompleted} 
								onChange={(event) =>
									handleTaskUpdate(task.id, event.currentTarget.checked)
								}
							/>
						),
					)}
				</Stack>
			</ScrollArea>
		</>
	);
}

export default TaskList;
