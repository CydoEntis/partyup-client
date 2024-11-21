import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	Member,
	CreateMember,
	UpdateMemberRole,
	PaginatedMembers,
	UpdateCreator,
	MembersToRemove,
} from "../shared/types/member.types";
import { QueryParams } from "../shared/types/query-params.types";

const getAllMembers = async (
	partyId: number,
	params?: QueryParams,
): Promise<PaginatedMembers> => {
	const queryParams = new URLSearchParams();

	Object.entries(params || {}).forEach(([key, value]) => {
		if (value) queryParams.append(key, value.toString());
	});

	const response = (
		await apiClient.get(
			`${endpoints.parties}/${partyId}/members?${queryParams.toString()}`,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getMemberById = async (
	partyId: number,
	memberId: number,
): Promise<Member> => {
	const response = (
		await apiClient.get(`${endpoints.parties}/${partyId}/,members/${memberId}`)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createMember = async (member: CreateMember): Promise<Member> => {
	const response = (await apiClient.post(`${endpoints.parties}`, member)).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const updateMembersRoles = async (
	partyId: number,
	updatedMemberRoles: UpdateMemberRole[],
): Promise<Member[]> => {
	const updatePartyMemberRoles = {
		partyId,
		memberRoles: updatedMemberRoles,
	};
	const response = (
		await apiClient.put(
			`${endpoints.parties}/${partyId}/members/update-role`,
			updatePartyMemberRoles,
		)
	).data;

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const changeCreator = async (
	updatedCreator: UpdateCreator,
): Promise<Member[]> => {
	console.log(updatedCreator);
	console.log(
		`${endpoints.parties}/${updatedCreator.partyId}/members/change-creator`,
	);

	const response = (
		await apiClient.put(
			`${endpoints.parties}/${updatedCreator.partyId}/members/change-creator`,
			updatedCreator,
		)
	).data;

	console.log(response);

	if (!response.isSuccess) throw new Error();
	return response.result;
};

const deleteMembers = async (
	membersToRemove: MembersToRemove,
): Promise<void> => {
	const response = (
		await apiClient.delete(
			`${endpoints.parties}/${membersToRemove.partyId}/members`,
			{ data: membersToRemove },
		)
	).data;
	if (!response.isSuccess) throw new Error();
};

const generateInviteToken = async (partyId: string): Promise<string> => {
	const response = (
		await apiClient.get(
			`${endpoints.parties}/${Number(partyId)}/members/invite`,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

export default {
	getAllMembers,
	getMemberById,
	createMember,
	updateMembersRoles,
	changeCreator,
	// deleteMember,
	deleteMembers,
	generateInviteToken,
};
