import {
	Box,
	Flex,
	Group,
	Stack,
	Title,
	Text,
	ActionIcon,
	Button,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import Members from "../../components/avatar/Members";
import { Edit, Plus, Users2 } from "lucide-react";
import useGetColorTheme from "../../hooks/useGetColorTheme";

type Props = {};

function CampaignPage({}: Props) {
	const { campaignId } = useParams();
	const { isLightMode } = useGetColorTheme();

	return (
		<>
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
						<Group>
							<Group align="center">
								<Users2 size={20} />
								<Text>Assign to Campaign</Text>
								<Members
									members={[
										{ name: "Gandalf", avatar: 1 },
										{ name: "Bilbo Baggins", avatar: 2 },
									]}
									totalMembers={3}
								/>
							</Group>

							<Button
								variant="light"
								color="violet"
								rightSection={<Plus size={20} />}
							>
								Invite Member
							</Button>
						</Group>
					</Stack>
				</Flex>
			</Box>
		</>
	);
}

export default CampaignPage;
