import { Flex, Group, Image, Text } from "@mantine/core";
import UserAvatar from "../../components/avatar/UserAvatar";
import { User } from "../../shared/types/auth.types";
import Coin from "../../assets/coin.png";

type ShopHeaderProps = {
	user: User;
};

function ShopHeader({ user }: ShopHeaderProps) {
	return (
		<Flex
			px={20}
			align="center"
			justify="space-between"
		>
			<Group>
				<UserAvatar
					avatar={user!.avatar}
					size="lg"
				/>
				<Text size="lg">{user?.displayName}</Text>
			</Group>
			<Group
				align="center"
				gap={12}
			>
				<Text
					size="xl"
					p={0}
				>
					{user?.currency}
				</Text>
				<Image
					src={Coin}
					w={20}
				/>
			</Group>
		</Flex>
	);
}

export default ShopHeader;
