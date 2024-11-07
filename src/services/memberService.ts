import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	Member,
	CreateMember,
	UpdateMemberRole,
	PaginatedMembers,
} from "../shared/types/member.types";
import { QueryParams } from "../shared/types/query-params.types";

const getAllMembers = async (
	partyId: number,
	params?: QueryParams,
): Promise<PaginatedMembers> => {
	const queryParams = new URLSearchParams();

	if (params) {
		if (params.searchValue)
			queryParams.append("searchValue", params.searchValue);
		if (params.orderOn) queryParams.append("orderOn", params.orderOn);
		if (params.orderBy) queryParams.append("orderBy", params.orderBy);
		if (params.pageNumber)
			queryParams.append("pageNumber", params.pageNumber.toString());
		if (params.pageSize)
			queryParams.append("pageSize", params.pageSize.toString());
	}

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
		await apiClient.get(
			`${endpoints.parties}/${partyId}/,members/${memberId}`,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createMember = async (member: CreateMember): Promise<Member> => {
	const response = (await apiClient.post(`${endpoints.parties}`, member))
		.data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const updateMemberRole = async (
	memberId: number,
	updatedMemberRole: UpdateMemberRole,
): Promise<Member> => {
	const response = (
		await apiClient.put(`${endpoints.parties}/${memberId}`, updatedMemberRole)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const deleteMember = async (memberId: number): Promise<void> => {
	const response = (
		await apiClient.delete(`${endpoints.parties}/${memberId}`)
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
	updateMemberRole,
	deleteMember,
	generateInviteToken,
};
