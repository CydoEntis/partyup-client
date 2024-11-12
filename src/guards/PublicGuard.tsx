import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { ReactNode } from "react";

type PublicGuardProps = {
	children: ReactNode;
}

const PublicGuard = ({ children }: PublicGuardProps) => {
	const { user } = useUserStore();

	if (user?.isLoggedIn) {
		return (
			<Navigate
				to="/dashboard"
				replace
			/>
		);
	}

	return <>{children}</>;
};

export default PublicGuard;
