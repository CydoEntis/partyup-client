import { Avatar as MantineAvatar } from "@mantine/core";
import useAvatar from "../../hooks/useGetAvatar";
import { Avatar } from "../../shared/types/auth.types";

type UserAvatarProps = { avatar: Avatar };

function UserAvatar({ avatar }: UserAvatarProps) {
	console.log(avatar.id);
	const avatarImage = useAvatar(avatar.id);


	if (!avatarImage) {
		console.warn(`Avatar image not found for avatar ID: ${avatar.id}`);
		return <div className="placeholder-avatar">Avatar not found</div>;
	}

	return (
		<MantineAvatar
			src={avatarImage}
			alt={avatar.name}
			bg="violet"
		/>
	);
}

export default UserAvatar;
