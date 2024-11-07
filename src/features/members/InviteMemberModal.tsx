import {
	ActionIcon,
	Button,
	CopyButton,
	Paper,
	Stack,
	Text,
	Tooltip,
	Flex,
	Modal,
} from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { Check, Copy, RefreshCcw } from "lucide-react";
import memberService from "../../services/memberService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function InviteMemberModal({ isOpened, onClose }: DrawerProps) {
	const { partyId } = useParams();
	const [inviteLink, setInviteLink] = useState("");
	const [countdown, setCountdown] = useState(0);
	const expirationTime = 900; // 15 minutes

	const generateInviteLink = async () => {
		if (partyId) {
			const token = await memberService.generateInviteToken(partyId);
			setInviteLink(
				`http://localhost:5173/parties/1/accept-invite?invite=${token}`,
			);
			setCountdown(expirationTime);
		}
	};

	useEffect(() => {
		if (isOpened) {
			generateInviteLink();
		}
	}, [isOpened]);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		if (countdown > 0) {
			timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		} else {
			setInviteLink("");
		}

		return () => {
			clearInterval(timer);
		};
	}, [countdown]);

	return (
		<Modal
			opened={isOpened}
			onClose={onClose}
			title="Invite Member"
			centered
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
						<Text ta="center">Generating Invite Link...</Text>
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
				{countdown > 0 ? (
					<Text ta="center" size="sm" c="red">Link expires in: {countdown} seconds</Text>
				) : (
					<Text ta="center" c="red">Token has expired!</Text>
				)}
				<Button
					fullWidth
					variant="light"
					color="violet"
					leftSection={<RefreshCcw size={16} />}
					onClick={generateInviteLink}
				>
					Get New Link
				</Button>
			</Stack>
		</Modal>
	);
}

export default InviteMemberModal;
