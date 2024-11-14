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
		const redirectTo =
			location.state?.from || location.pathname + location.search;
		return (
			<Navigate
				to={redirectTo}
				replace
			/>
		);
	}

	// Return children if the user is not logged in
	return <>{children}</>;
};

export default PublicGuard;
