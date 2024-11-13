import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { ReactNode } from "react";

type PublicGuardProps = {
	children: ReactNode;
};

const PublicGuard = ({ children }: PublicGuardProps) => {
	const { user } = useUserStore();
	const location = useLocation();

	console.log(user);

	if (user && user.isLoggedIn) {
		return (
			<Navigate
				to={location.state.from || "/dashboard"}
				replace
			/>
		);
	}

	return <>{children}</>;
};

export default PublicGuard;
