import { Box, Checkbox, ScrollArea, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Step } from "../../shared/types/step.types";
import useQuestStore from "../../stores/useQuestStore";
import { Quest } from "../../shared/types/quest.types";

type StepListProps = {
	title: string;
	quest: Quest;
};

function StepList({ title, quest }: StepListProps) {
	const [stepsList, setStepsList] = useState<Step[]>(quest.steps);
	const { updateStep } = useQuestStore();

	useEffect(() => {
		setStepsList(quest.steps);
	}, [quest.steps]);

	const handleStepUpdate = async (id: number, completed: boolean) => {
		setStepsList((prevSteps) =>
			prevSteps.map((step) =>
				step.id === id ? { ...step, isCompleted: completed } : step,
			),
		);

		try {
			await updateStep(quest.id.toString(), id, {
				id: id,
				isCompleted: completed,
			});
		} catch (error) {
			console.error("Error updating step:", error);
		}
	};

	return (
		<Box py={8}>
			<Title size="lg" pb={20}>{title}</Title>
			<ScrollArea
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
							disabled={quest.isCompleted}
						/>
					))}
				</Stack>
			</ScrollArea>
		</Box>
	);
}

export default StepList;
