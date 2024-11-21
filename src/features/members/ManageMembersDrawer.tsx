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
	Select,
} from "@mantine/core";
import { DrawerProps } from "../../shared/types/drawer.types";
import { Check, Copy, Crown, Edit, RefreshCcw, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useMemberStore from "../../stores/useMemberStore";
import memberService from "../../services/memberService";
import UserAvatar from "../../components/avatar/UserAvatar";
import { MEMBER_ROLES } from "../../shared/constants/roles";
import MemberManagementList from "./MemberManagementList";

type ManageMemberProps = {
	userRole: string;
} & DrawerProps;

function ManageMembersDrawer({
	userRole,
	isOpened,
	onClose,
}: ManageMemberProps) {
	const { partyId } = useParams();
	const { getMembersByRole, creator, maintainers, regularMembers } =
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

	const [isEditing, setIsEditing] = useState(false);

	const handleEditing = () => {
		setIsEditing((prevState) => !prevState);
	};

	const handleClose = () => {
		setIsEditing(false);
		onClose();
	}

	return (
		<Drawer
			opened={isOpened}
			onClose={handleClose}
			title="Manage Members"
			position="right"
			size={500}
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
			{userRole === MEMBER_ROLES.CREATOR ||
			userRole === MEMBER_ROLES.MAINTAINER ? (
				<Flex
					justify="space-between"
					align="center"
					py={16}
				>
					<Title size="xl">Manage Members</Title>
					<ActionIcon
						variant="light"
						color="violet"
						onClick={handleEditing}
					>
						{isEditing ? <X size={20} /> : <Edit size={20} />}
					</ActionIcon>
				</Flex>
			) : null}
			{isEditing ? (
				creator &&
				partyId && (
					<MemberManagementList
						partyId={+partyId}
						creator={creator}
						maintainers={maintainers}
						regularMembers={regularMembers}
					/>
				)
			) : (
				<Stack gap={8}>
					<Divider
						label="Creator"
						labelPosition="center"
					/>
					{creator && (
						<Stack>
							<Group key={creator.id}>
								<UserAvatar avatar={creator.avatar} />
								<Text>{creator.displayName}</Text>
							</Group>
						</Stack>
					)}

					{/* Maintainers Section */}
					{maintainers.length > 0 && (
						<Stack>
							<Divider
								label="Maintainers"
								labelPosition="center"
							/>
							{maintainers.map((maintainer) => (
								<Group key={maintainer.id}>
									<UserAvatar avatar={maintainer.avatar} />
									<Text>{maintainer.displayName}</Text>
								</Group>
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
								<Group key={member.id}>
									<UserAvatar avatar={member.avatar} />
									<Text>{member.displayName}</Text>
								</Group>
							))}
						</Stack>
					)}
				</Stack>
			)}
		</Drawer>
	);
}

export default ManageMembersDrawer;
