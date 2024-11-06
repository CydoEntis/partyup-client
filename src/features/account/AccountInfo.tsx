import { Flex, Paper } from "@mantine/core";
import UserLevel from "../user/UserLevel";
import { ChevronRight } from "lucide-react";
import { User } from "../../shared/types/auth.types";
import { NavLink } from "react-router-dom";

type AccountInfoProps = { user: User };

function AccountInfo({ user }: AccountInfoProps) {
	return (
		<Paper
			component={NavLink}
			p={16}
			className="hover:brightness-90 cursor-pointer"
			withBorder
			to="/account"
		>
			<Flex
				justify="space-between"
				align="center"
			>
				<UserLevel user={user!} />
				<ChevronRight size={16} />
			</Flex>
		</Paper>
	);
}

export default AccountInfo;
