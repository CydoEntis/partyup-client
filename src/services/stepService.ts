import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import { Step, UpdateStep } from "../shared/types/step.types";

const updateStep = async (
	updatedQuest: UpdateStep,
): Promise<Step> => {
	const response = (await apiClient.put(`${endpoints.steps}`, updatedQuest))
		.data;
	if (!response.isSuccess) {
		console.log(response.errors)
	};

	console.log("Updated quest response: ", response);

	return response.result;
};

export default {
	updateStep,
};
