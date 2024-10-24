import { Checkbox, ScrollArea, Stack, Title } from "@mantine/core";
import React from "react";

type TaskListProps = {
	title: string;
	tasks: [];
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
						<Checkbox
							color="violet"
							size="md"
							value="react"
							label="React"
						/>
					</Stack>
				</Checkbox.Group>
			</ScrollArea>
		</>
	);
}

export default TaskList;
