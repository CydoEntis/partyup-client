import PartyTabs from "../../features/party/PartyTabs";
import InviteMemberModal from "../../features/members/InviteMemberModal";
import QuestDrawer from "../../features/quest/QuestDrawer";
import usePartyDrawer from "../../hooks/usePartyDrawer";
import useQuestDrawer from "../../hooks/useQuestDrawer";
import PartyDrawer from "../../features/party/PartyDrawer";
import PartyHeaderSkeleton from "../../features/loading-skeletons/PartyHeaderSkeleton";
import usePartyStore from "../../stores/usePartyStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PartyHeader from "../../features/party/PartyHeader";

type Props = {};

function PartyPage({}: Props) {
	const { partyId } = useParams();
	const {
		getParty,
		party,
		loading: partyLoading,
	} = usePartyStore();

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

	const { questViewType, openedQuest, closeQuest, handleNewQuest } =
		useQuestDrawer();

	const {
		openMemberInvite,
		closeMemberInvite,
		openedInviteMember,
		openedParty,
		closeParty,
		handleEditParty,
	} = usePartyDrawer();


	return (
		<>
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
			{partyLoading ? (
				<PartyHeaderSkeleton />
			) : party ? (
				<PartyHeader
					title={party.title}
					members={party.members}
					handleEditParty={handleEditParty}
					handleNewQuest={handleNewQuest}
					openMemberInvite={openMemberInvite}
				/>
			) : (
				<div>No party found</div>
			)}

			<PartyTabs />
		</>
	);
}

export default PartyPage;
