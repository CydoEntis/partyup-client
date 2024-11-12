import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { ReactNode } from "react";

interface UnAuthGuardProps {
	children: ReactNode;
}

const UnAuthGuard = ({ children }: UnAuthGuardProps) => {
	const { user } = useAuthStore();

	if (user?.isLoggedIn) {
		return <Navigate to="/dashboard" />;
	}

	return <>{children}</>;
};

export default UnAuthGuard;
