import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { ReactNode } from "react";

interface UnAuthGuardProps {
	children: ReactNode;
}

const UnAuthGuard = ({ children }: UnAuthGuardProps) => {
	const { user } = useUserStore();

	if (user?.isLoggedIn) {
		return <Navigate to="/dashboard" />;
	}

	return <>{children}</>;
};

export default UnAuthGuard;
