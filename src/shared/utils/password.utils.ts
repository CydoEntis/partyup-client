export const passwordRequirements = [
	{ re: /[A-Z]/, label: "Includes uppercase letter" },
	{ re: /[a-z]/, label: "Includes lowercase letter" },
	{ re: /\d/, label: "Includes number" },
	{ re: /[\W_]/, label: "Includes special character" },
	{ re: /.{8,}/, label: "At least 8 characters long" },
];

export function testPasswordStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1;

	passwordRequirements.forEach((passwordRequirements) => {
		if (!passwordRequirements.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(
		100 - (100 / (passwordRequirements.length + 1)) * multiplier,
		10,
	);
}
