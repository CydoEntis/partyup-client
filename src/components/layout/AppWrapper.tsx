import { AppShell } from "@mantine/core";
import  { ReactNode } from "react";
import useGetColorTheme from "../../hooks/useGetColorTheme";

type AppWrapperProps = {
	opened: boolean;
	children: ReactNode;
};

function AppWrapper({ opened, children }: AppWrapperProps) {
	const { isLightMode } = useGetColorTheme();
	return (
		<AppShell
			header={{ height: { base: 60, md: 70, lg: 80 } }}
			navbar={{
				width: { base: 200, md: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			bg={isLightMode ? "lightMode.9" : "darkMode.9"}

		>
			{children}
		</AppShell>
	);
}

export default AppWrapper;
