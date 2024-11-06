import { Avatar as MantineAvatar } from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { forwardRef } from "react";
import { Avatar } from "../../shared/types/avatar.types";

type ShopAvatarProps = { avatar: Avatar };

const ShopAvatar = forwardRef<HTMLDivElement, ShopAvatarProps>(
	({ avatar }, ref) => {
		const avatarImage = useAvatar(avatar.id);

		return (
			<MantineAvatar
				ref={ref} 
				src={avatarImage}
				alt={avatar.name}
				bg="violet"
				size="lg"
			/>
		);
	},
);

export default ShopAvatar;
