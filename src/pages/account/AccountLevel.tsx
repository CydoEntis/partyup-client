import {
	Avatar,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	Box,
	Tooltip,
	Flex,
	Menu,
	SimpleGrid,
	Popover,
} from "@mantine/core";
import { getPercentage } from "../../shared/utils/progress-bar.utils";
import useAvatar from "../../hooks/useGetAvatar";
import { Edit2 } from "lucide-react";
import ThemeToggle from "../../features/theme/ThemeToggle";
import { useDisclosure } from "@mantine/hooks";
import useAuthStore from "../../stores/useAuthStore";
import { User } from "../../shared/types/auth.types";
import Test from "../../features/account/AccountManagement";
import { useEffect } from "react";
import useAvatarStore from "../../stores/useAvatarStore";
import UnlockedAvatar from "../../components/avatar/UnlockedAvatar";

type AccountLevelProps = {
	user: User;
};

function AccountLevel({ user }: AccountLevelProps) {
	const avatarImage = user ? useAvatar(user.avatar.id) : undefined;


	// const [
	// 	changeAvatarOpened,
	// 	{ open: openChangeAvatar, close: closeChangeAvatar },
	// ] = useDisclosure(false);

	const { getUnlockedAvatars, unlockedAvatars } = useAvatarStore();

	useEffect(() => {
		const fetchUnlockedAvatars = async () => {
			await getUnlockedAvatars();
		};

		fetchUnlockedAvatars();
	}, []);

	if (!user) return null;

	return (
		<>
			{/* <ChangeAvatar
				changedAvatarOpened={changeAvatarOpened}
				onCloseChangeAvatar={closeChangeAvatar}
				user={user}
			/> */}


		</>
	);
}

export default AccountLevel;


