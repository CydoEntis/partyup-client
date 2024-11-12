import { AppShell } from "@mantine/core";
import  { ReactNode } from "react";

type PublicWrapperProps = {
	opened: boolean;
	children: ReactNode;
};

function PublicWrapper({ opened, children }: PublicWrapperProps) {
	return (
		<AppShell
			header={{ height: { base: 60} }}
			bg={"primary"}
		>
			{children}
		</AppShell>
	);
}

export default PublicWrapper;
