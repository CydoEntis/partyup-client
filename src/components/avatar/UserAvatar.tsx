import { Avatar as MantineAvatar } from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { Avatar } from "../../shared/types/auth.types";
import React, { forwardRef } from "react";

type UserAvatarProps = { avatar: Avatar };

// Wrap UserAvatar with forwardRef
const UserAvatar = forwardRef<HTMLDivElement, UserAvatarProps>(
	({ avatar }, ref) => {
		const avatarImage = useAvatar(avatar.id);

		return (
			<MantineAvatar
				ref={ref} // Add the ref to the MantineAvatar
				src={avatarImage}
				alt={avatar.name}
				bg="violet"
			/>
		);
	},
);

export default UserAvatar;
