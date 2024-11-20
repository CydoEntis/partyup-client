import {
	ActionIcon,
	Button,
	CopyButton,
	Paper,
	Stack,
	Text,
	Tooltip,
	Flex,
	Drawer,
	Group,
	Title,
	Divider,
} from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { Check, Copy, Edit, RefreshCcw } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMemberStore from "../../stores/useMemberStore";
import memberService from "../../services/memberService";
import UserAvatar from "../../components/avatar/UserAvatar";

function ManageMembersDrawer({ isOpened, onClose }: DrawerProps) {
	const { partyId } = useParams();
	const { getMembersByRole, members, creator, maintainers, regularMembers } =
		useMemberStore();
	const [inviteLink, setInviteLink] = useState("");
	const [countdown, setCountdown] = useState(0);
	const expirationTime = 900; // 15 minutes

	useEffect(() => {
		const fetchMembers = async () => {
			if (partyId) {
				await getMembersByRole(Number(partyId));
			}
		};

		if (isOpened) {
			fetchMembers();
		}
	}, [partyId, isOpened, getMembersByRole]);

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
		<Drawer
			opened={isOpened}
			onClose={onClose}
			title="Manage Members"
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
					<Text
						ta="center"
						size="sm"
						c="red"
					>
						Link expires in: {countdown} seconds
					</Text>
				) : (
					<Text
						ta="center"
						c="red"
					>
						Token has expired!
					</Text>
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
			<Stack p={16}>
				<Divider
					label="Creator"
					labelPosition="center"
				/>
				{creator && (
					<Stack mb={16}>
						<Title size="lg">Creator</Title>
						<Flex
							align="center"
							justify="space-between"
						>
							<Group>
								<UserAvatar avatar={creator.avatar} />
								<Text>{creator.displayName}</Text>
							</Group>
							<ActionIcon
								variant="light"
								color="violet"
							>
								<Edit size={20} />
							</ActionIcon>
						</Flex>
					</Stack>
				)}

				{/* Maintainers Section */}
				{maintainers.length > 0 && (
					<Stack mb={16}>
						<Divider
							label="Maintainers"
							labelPosition="center"
						/>
						{maintainers.map((maintainer) => (
							<Flex
								key={maintainer.id}
								align="center"
								justify="space-between"
							>
								<Group>
									<UserAvatar avatar={maintainer.avatar} />
									<Text>{maintainer.displayName}</Text>
								</Group>
								<ActionIcon
									variant="light"
									color="violet"
								>
									<Edit size={20} />
								</ActionIcon>
							</Flex>
						))}
					</Stack>
				)}
				<Divider
					label="Members"
					labelPosition="center"
				/>
				{/* Regular Members Section */}
				{regularMembers.length > 0 && (
					<Stack>
						{regularMembers.map((member) => (
							<Flex
								key={member.id}
								align="center"
								justify="space-between"
							>
								<Group>
									<UserAvatar avatar={member.avatar} />
									<Text>{member.displayName}</Text>
								</Group>
								<ActionIcon
									variant="light"
									color="violet"
								>
									<Edit size={20} />
								</ActionIcon>
							</Flex>
						))}
					</Stack>
				)}
			</Stack>
		</Drawer>
	);
}

export default ManageMembersDrawer;
