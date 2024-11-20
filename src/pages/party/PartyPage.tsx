import PartyTabs from "../../features/party/PartyTabs";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import PartyDrawer from "../../features/party/PartyDrawer";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PartyHeader from "../../features/party/header/PartyHeader";
import usePartyStore from "../../stores/usePartyStore";
import PartyHeaderSkeleton from "../../features/loading-skeletons/PartyHeaderSkeleton";
import usePartyDrawer from "../../hooks/usePartyDrawer";
import { Box, Center, SimpleGrid, Skeleton, Stack, Title } from "@mantine/core";
import PartyFooter from "../../features/party/footer/PartyFooter";
import QuestListBody from "../../features/quest/body/QuestListBody";
import useQuestStore from "../../stores/useQuestStore";
import useUserStore from "../../stores/useUserStore";
import ManageMembersDrawer from "../../features/members/ManageMembersDrawer";

type Props = {};

function PartyPage({}: Props) {
	const { layout } = useUserStore();

	const { partyId } = useParams();
	const {
		getParty,
		party,
		loading: { detail: loadingParty },
	} = usePartyStore();
	const {
		getQuests,
		paginatedQuests: quests,
		loading: { list: loadingList },
	} = useQuestStore();

	const [page, setPage] = useState(1);


	useEffect(() => {
		const fetchQuests = async () => {
			if (partyId) {
				try {
					const params = {
						pageNumber: page,
					};
					await getQuests(partyId, params);
				} catch (error) {
					console.error("Error fetching party or quests:", error);
				}
			}
		};

		fetchQuests();
	}, [partyId, getQuests, page, layout]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	useEffect(() => {
		const fetchParty = async () => {
			if (partyId) {
				try {
					await getParty(partyId);
				} catch (error) {
					console.error("Error fetching party or quests:", error);
				}
			}
		};

		fetchParty();
	}, [partyId, getParty]);

	const {
		questViewType,
		openedQuest,
		closeQuest,
		handleNewQuest,
		handleViewQuest,
	} = useQuestDrawer();

	const {
		openMemberInvite,
		closeMemberInvite,
		openedInviteMember,
		openedParty,
		closeParty,
		handleEditParty,
	} = usePartyDrawer();

	if (loadingParty)
		return (
			<>
				<Box mih="100vh">
					<PartyHeaderSkeleton />
					<Box p={32}>
						{layout === "grid" ? (
							<SimpleGrid cols={6}>
								{Array.from({ length: 24 }).map((_, index) => (
									<Skeleton
										key={index}
										height={350}
										mb="md"
									/>
								))}
							</SimpleGrid>
						) : (
							Array.from({ length: 12 }).map((_, index) => (
								<Skeleton
									key={index}
									height={50}
									mb="md"
								/>
							))
						)}
					</Box>
				</Box>
			</>
		);

	if (!party)
		return (
			<Stack
				align="center"
				justify="center"
				mih="95vh"
			>
				<Center>
					<Title>Sorry, We Couldn't find the party you were looking for</Title>
				</Center>
			</Stack>
		);

	return (
		<Box>
			<ManageMembersDrawer
				isOpened={openedInviteMember}
				onClose={closeMemberInvite}
			/>
			<QuestDrawer
				viewType={questViewType}
				isOpened={openedQuest}
				onClose={closeQuest}
			/>
			{party && (
				<PartyDrawer
					isOpened={openedParty}
					onClose={closeParty}
					drawerMode="edit"
					party={party}
				/>
			)}
			<PartyHeader
				party={party}
				handleEditParty={handleEditParty}
				handleNewQuest={handleNewQuest}
				openMemberInvite={openMemberInvite}
			/>
			<QuestListBody
				quests={quests.items}
				layout={layout}
				handleViewQuest={handleViewQuest}
				loading={loadingList}
				handleCreateQuest={function (): void {
					throw new Error("Function not implemented.");
				}}
			/>

			<PartyFooter
				totalPages={quests.totalPages}
				onPageChange={handlePageChange}
				page={page}
			/>
		</Box>
	);
}

export default PartyPage;
