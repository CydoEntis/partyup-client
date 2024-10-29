import { ActionIcon } from "@mantine/core";
import { Edit, X } from "lucide-react";
import React from "react";

type ToggleEditProps = {
	toggle: () => void;
	isEditing: boolean;
};

function ToggleEdit({ toggle, isEditing }: ToggleEditProps) {
	return (
		<ActionIcon onClick={toggle}>{isEditing ? <X /> : <Edit />}</ActionIcon>
	);
}

export default ToggleEdit;
