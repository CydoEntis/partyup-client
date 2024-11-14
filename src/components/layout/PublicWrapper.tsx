import { AppShell, Box } from "@mantine/core";
import { ReactNode } from "react";

type PublicWrapperProps = {
	opened: boolean;
	children: ReactNode;
};

function PublicWrapper({ opened, children }: PublicWrapperProps) {
	return (
		<AppShell
			header={{ height: { base: 60 } }}
			navbar={{
				width: { base: 200, md: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			bg={"primary"}
		>
			{children}
		</AppShell>
	);
}

export default PublicWrapper;
