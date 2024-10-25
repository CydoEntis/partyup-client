import { Popover, PasswordInput, Progress } from "@mantine/core";
import PasswordRequirement from "./PasswordRequirement";
import { useState } from "react";
import {
	passwordRequirements,
	testPasswordStrength,
} from "../../shared/utils/password.utils";

import classes from "../../features/auth/auth.module.css";
import { Lock } from "lucide-react";
import { UseFormReturnType } from "@mantine/form";

type ValidatedPasswordInputProps = {
	form: UseFormReturnType<any>;
};

function ValidatedPasswordInput({form}: ValidatedPasswordInputProps) {
	const [popoverOpened, setPopoverOpened] = useState(false);
	const [passwordValue, setPasswordValue] = useState("");
	const checks = passwordRequirements.map((requirement, index) => (
		<PasswordRequirement
			key={index}
			label={requirement.label}
			meets={requirement.re.test(passwordValue)}
		/>
	));

	const strength = testPasswordStrength(passwordValue);
	const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

	return (
		<Popover
			opened={popoverOpened}
			position="bottom"
			width="target"
			transitionProps={{ transition: "pop" }}
		>
			<Popover.Target>
				<div
					onFocusCapture={() => setPopoverOpened(true)}
					onBlurCapture={() => setPopoverOpened(false)}
				>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						mt="md"
						classNames={{
							input: classes.input,
						}}
						leftSection={<Lock size={20} />}
						{...form.getInputProps("password")}
						onChange={(event) => {
							setPasswordValue(event.currentTarget.value);
							form.setFieldValue("password", event.currentTarget.value);
						}}
					/>
				</div>
			</Popover.Target>
			<Popover.Dropdown>
				<Progress
					color={color}
					value={strength}
					size={5}
					mb="xs"
				/>
				<PasswordRequirement
					label="Includes at least 6 characters"
					meets={passwordValue.length > 5}
				/>
				{checks}
			</Popover.Dropdown>
		</Popover>
	);
}

export default ValidatedPasswordInput;
