import { Checkbox, ScrollArea, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Step } from "../../shared/types/quest.types";

type StepListProps = {
	title: string;
	steps: Step[];
};

function StepList({ title, steps }: StepListProps) {
	const [stepsList, setStepsList] = useState<Step[]>([]);

	useEffect(() => {
		setStepsList(steps);
	}, [steps]);

	const handleStepUpdate = (id: number, completed: boolean) => {
		setStepsList((prevSteps) =>
			prevSteps.map((step) =>
				step.id === id ? { ...step, isCompleted: completed } : step,
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
					{stepsList.map((step) => (
						<Checkbox
							key={step.id}
							color="violet"
							size="md"
							value={step.id.toString()}
							label={step.description}
							checked={step.isCompleted}
							onChange={(event) =>
								handleStepUpdate(step.id, event.currentTarget.checked)
							}
						/>
					))}
				</Stack>
			</ScrollArea>
		</>
	);
}

export default StepList;
