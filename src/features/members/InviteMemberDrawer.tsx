import {
	ActionIcon,
	Button,
	CopyButton,
	Drawer,
	Paper,
	Stack,
	Text,
	Tooltip,
	Group,
	Flex,
} from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { Check, Copy, RefreshCcw } from "lucide-react";
import memberService from "../../services/memberService";
import { useParams } from "react-router-dom";
import { useState } from "react";

function InviteMemberDrawer({ isOpened, onClose }: DrawerProps) {
	const { campaignId } = useParams();
	const [inviteLink, setInviteLink] = useState("");
	const generateInviteLink = async () => {
		if (campaignId) {
			const token = await memberService.generateInviteToken(campaignId);
			setInviteLink(
				`http://localhost:5173/campaigns/1/accept-invite?invite=${token}`,
			);
		}
	};

	return (
		<Drawer
			opened={isOpened}
			onClose={onClose}
			title="Invite Member"
			position="right"
		>
			<Stack gap={8}>
				<Paper
					p={8}
					withBorder
					style={{
						overflowX: "auto",
						whiteSpace: "nowrap",
					}}
				>
					{inviteLink === "" ? (
						<Text ta="center">Generate an Invite Link</Text>
					) : (
						<Flex
							align="center"
							justify="space-between"
							w="100%"
							gap={8}
						>
							<CopyButton
								value={inviteLink}
								timeout={2000}
							>
								{({ copied, copy }) => (
									<Tooltip
										label={copied ? "Copied" : "Copy"}
										withArrow
										position="right"
									>
										<ActionIcon
											color={copied ? "teal" : "gray"}
											variant="subtle"
											onClick={copy}
										>
											{copied ? <Check size={16} /> : <Copy size={16} />}
										</ActionIcon>
									</Tooltip>
								)}
							</CopyButton>
							<Text>{inviteLink}</Text>
						</Flex>
					)}
				</Paper>
				<Button
					fullWidth
					variant="light"
					color="violet"
					leftSection={<RefreshCcw size={16} />}
					onClick={generateInviteLink}
				>
					Invite Link
				</Button>
			</Stack>
		</Drawer>
	);
}

export default InviteMemberDrawer;
