import {
	ActionIcon,
	Box,
	Button,
	Flex,
	Group,
	Stack,
	Title,
	Text,
} from "@mantine/core";
import { Edit, Users2, Plus } from "lucide-react";
import Members from "../../components/avatar/Members";
import useGetColorTheme from "../../hooks/useGetColorTheme";

type Props = {};

function CampaignHeader({}: Props) {
	const { isLightMode } = useGetColorTheme();
	return (
		<Box
			bg={isLightMode ? "lightMode.7" : "darkMode.8"}
			p={16}
		>
			<Flex
				justify="space-between"
				align="center"
			>
				<Stack>
					<Group align="center">
						<Title size="2.5rem">Product Development</Title>
						<ActionIcon
							variant="transparent"
							color="violet"
						>
							<Edit size={20} />
						</ActionIcon>
					</Group>

				</Stack>
			</Flex>
		</Box>
	);
}

export default CampaignHeader;
