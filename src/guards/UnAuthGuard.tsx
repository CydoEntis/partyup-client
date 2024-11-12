import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { ReactNode } from "react";

type UnAuthGuardProps = {
	children: ReactNode;
}

const UnAuthGuard = ({ children }: UnAuthGuardProps) => {
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

export default UnAuthGuard;
