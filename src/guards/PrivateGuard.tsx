import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

interface PrivateGuardProps {
	children: JSX.Element;
}

const PrivateGuard = ({ children }: PrivateGuardProps) => {
	const { user, restoreSession } = useUserStore();
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		restoreSession();
		setLoading(false);
	}, [restoreSession]);

	useEffect(() => {
		if (!loading && !user?.isLoggedIn) {
			navigate("/login", { state: { from: location }, replace: true });
		}
	}, [loading, user, location, navigate]);

	if (loading) {
		return <div>Loading...</div>;
	}

	// Return children if logged in
	return user?.isLoggedIn ? children : null;
};

export default PrivateGuard;
