import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
	const { user } = useAuthStore();

	const location = useLocation();

	if (!user?.isLoggedIn) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
			/>
		);
	}

	return children;
};

export default AuthGuard;
