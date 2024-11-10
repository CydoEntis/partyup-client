import { Button, Flex, Menu, Paper } from "@mantine/core";
import UserLevel from "../user/UserLevel";
import { ChevronRight } from "lucide-react";
import { User } from "../../shared/types/auth.types";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AccountDetails from "../../pages/account/AccountDetails";

type AccountInfoProps = { user: User; onOpen: () => void };

function AccountInfo({ user, onOpen }: AccountInfoProps) {
	return (
		<>
			<Paper
				p={16}
				className="hover:brightness-90 cursor-pointer"
				withBorder
				onClick={onOpen}
			>
				<Flex
					justify="space-between"
					align="center"
				>
					<UserLevel user={user!} />
					<ChevronRight size={16} />
				</Flex>
			</Paper>
		</>
	);
}

export default AccountInfo;
