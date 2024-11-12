import { AppShell } from "@mantine/core";
import  { ReactNode } from "react";

type PrivateWrapperProps = {
	opened: boolean;
	children: ReactNode;
};

function PrivateWrapper({ opened, children }: PrivateWrapperProps) {
	return (
		<AppShell
			header={{ height: { base: 60 } }}
			bg={"primary"}
			navbar={{
				width: { base: 200, md: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			{children}
		</AppShell>
	);
}

export default PrivateWrapper;
