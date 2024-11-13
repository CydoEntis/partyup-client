import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

interface PrivateGuardProps {
	children: JSX.Element;
}

const PrivateGuard = ({ children }: PrivateGuardProps) => {
	const { user } = useUserStore();
	const location = useLocation();
	const navigate = useNavigate();
	const isLoggedIn = user?.isLoggedIn;

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login", { state: { from: location }, replace: true });
		}
	}, [isLoggedIn, location, navigate]);

	return isLoggedIn ? children : null;
};

export default PrivateGuard;