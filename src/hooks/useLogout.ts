import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

function useLogout() {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	const logoutHandler = () => {
		logout();
		navigate("/login");
	};

	return logoutHandler;
}

export default useLogout;
