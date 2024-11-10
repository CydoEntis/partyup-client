import { Flex, Paper } from "@mantine/core";
import UserLevel from "../user/UserLevel";
import { ChevronRight } from "lucide-react";
import { User } from "../../shared/types/auth.types";

type AccountIndicatorProps = { user: User; onOpen: () => void };

function AccountIndicator({ user, onOpen }: AccountIndicatorProps) {
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

export default AccountIndicator;
