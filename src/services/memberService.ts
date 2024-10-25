import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";
import {
	Member,
	CreateMember,
	UpdateMemberRole,
} from "../shared/types/member.types";

const getAllMembers = async (campaignId: number): Promise<Member[]> => {
	const response = (
		await apiClient.get(`${endpoints.campaigns}/${campaignId}/members`)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const getMemberById = async (
	campaignId: number,
	memberId: number,
): Promise<Member> => {
	const response = (
		await apiClient.get(
			`${endpoints.campaigns}/${campaignId}/,members/${memberId}`,
		)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const createMember = async (member: CreateMember): Promise<Member> => {
	const response = (await apiClient.post(`${endpoints.campaigns}`, member))
		.data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const updateMemberRole = async (
	memberId: number,
	updatedMemberRole: UpdateMemberRole,
): Promise<Member> => {
	const response = (
		await apiClient.put(`${endpoints.campaigns}/${memberId}`, updatedMemberRole)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const deleteMember = async (memberId: number): Promise<void> => {
	const response = (
		await apiClient.delete(`${endpoints.campaigns}/${memberId}`)
	).data;
	if (!response.isSuccess) throw new Error();
};

export default {
	getAllMembers,
	getMemberById,
	createMember,
	updateMemberRole,
	deleteMember,
};
