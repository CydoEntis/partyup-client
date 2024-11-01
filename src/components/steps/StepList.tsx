import { Checkbox, ScrollArea, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Step } from "../../shared/types/step.types";
import useQuestStore from "../../stores/useQuestStore";

type StepListProps = {
	title: string;
	steps: Step[];
};

function StepList({
	title,
	steps,
	questId,
}: StepListProps & { questId: string }) {
	const [stepsList, setStepsList] = useState<Step[]>(steps);
	const { updateStep } = useQuestStore();

	useEffect(() => {
		setStepsList(steps);
	}, [steps]);

	const handleStepUpdate = async (id: number, completed: boolean) => {
		setStepsList((prevSteps) =>
			prevSteps.map((step) =>
				step.id === id ? { ...step, isCompleted: completed } : step,
			),
		);

		try {
			await updateStep(questId, id, { id: id, isCompleted: completed });
		} catch (error) {
			console.error("Error updating step:", error);
		}
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
