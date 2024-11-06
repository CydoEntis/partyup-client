import { Avatar as MantineAvatar } from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { forwardRef } from "react";
import { Avatar } from "../../shared/types/avatar.types";

type UserAvatarProps = { avatar: Avatar };

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