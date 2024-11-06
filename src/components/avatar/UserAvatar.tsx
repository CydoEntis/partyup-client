import { Avatar as MantineAvatar } from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { forwardRef } from "react";
import { Avatar } from "../../shared/types/avatar.types";

type UserAvatarProps = { avatar: Avatar, size?: "xs" | "sm" | "md" | "lg" | "xl" };

const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
	({ avatar, size = "md" }, ref) => {
		const avatarImage = useAvatar(avatar.id);

		return (
			<MantineAvatar
				ref={ref} // Add the ref to the MantineAvatar
				src={avatarImage}
				alt={avatar.name}
				bg="violet"
				size={size}
			/>
		);
	},
);

export default UserAvatar;
