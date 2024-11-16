import PartyTabs from "../../features/party/PartyTabs";
import InviteMemberModal from "../../features/members/InviteMemberModal";
import QuestDrawer from "../../features/quest/QuestDrawer";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import PartyDrawer from "../../features/party/PartyDrawer";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PartyHeader from "../../features/party/header/PartyHeader";
import usePartyStore from "../../stores/usePartyStore";
import PartyHeaderSkeleton from "../../features/loading-skeletons/PartyHeaderSkeleton";
import usePartyDrawer from "../../hooks/usePartyDrawer";
import { Box } from "@mantine/core";
import PartyFooter from "../../features/party/footer/PartyFooter";
import QuestListBody from "../../features/quest/body/QuestListBody";
import useQuestStore from "../../stores/useQuestStore";
import useUserStore from "../../stores/useUserStore";

type Props = {};

function PartyPage({}: Props) {
	// Update because each page uses a different layout option
	const { layout } = useUserStore();

	const { partyId } = useParams();
	const {
		getParty,
		party,
		loading: { detail },
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
	}, [partyId, getQuests, page]);

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

	return (
		<Box>
			<InviteMemberModal
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
			{detail ? (
				<PartyHeaderSkeleton />
			) : party ? (
				<PartyHeader
					party={party}
					handleEditParty={handleEditParty}
					handleNewQuest={handleNewQuest}
					openMemberInvite={openMemberInvite}
				/>
			) : (
				<div>No party found</div>
			)}
			<QuestListBody
				quests={quests.items}
				layout={layout}
				handleViewQuest={handleViewQuest}
				loading={loadingList}
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
