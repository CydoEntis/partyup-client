import { create } from "zustand";
import {
	Member,
	CreateMember,
	UpdateMemberRole,
} from "../shared/types/member.types";
import memberService from "../services/memberService";

type Memberstate = {
	members: Member[];
	member: Member | null;
	loading: boolean;
	error: string | null;
	getMembers: (campaignId: number) => Promise<void>;
	getMember: (campaignId: number, memberId: number) => Promise<void>;
	createMember: (member: CreateMember) => Promise<number>;
	updateMemberRole: (
		id: number,
		updatedDetails: UpdateMemberRole,
	) => Promise<void>;
	deleteMember: (id: number) => Promise<void>;
};

export const useMemberStore = create<Memberstate>((set) => ({
	members: [],
	member: null,
	loading: false,
	error: null,

	getMembers: async (campaignId: number) => {
		set({ loading: true, error: null });
		try {
			const members = await memberService.getAllMembers(campaignId);
			set({ members, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch members", loading: false });
			throw error;
		}
	},

	getMember: async (campaignId: number, memberId: number) => {
		set({ loading: true, error: null });
		try {
			const member = await memberService.getMemberById(campaignId, memberId);
			set({ member, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch member", loading: false });
			throw error;
		}
	},

	createMember: async (member: CreateMember): Promise<number> => {
		set({ loading: true, error: null });
		try {
			const newMember = await memberService.createMember(member);
			set((state) => ({
				members: [...state.members, newMember],
				loading: false,
			}));
			return newMember.id;
		} catch (error) {
			set({ error: "Failed to create member", loading: false });
			throw error;
		}
	},

	updateMemberRole: async (
		id: number,
		updatedMemberRole: UpdateMemberRole,
	): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const updatedMember = await memberService.updateMemberRole(
				id,
				updatedMemberRole,
			);
			set((state) => {
				const updatedMembers = state.members.map((member) =>
					member.id === id ? { ...member, ...updatedMember } : member,
				);
				return {
					members: updatedMembers,
					member:
						state.member?.id === id
							? { ...state.member, ...updatedMember }
							: state.member,
					loading: false,
				};
			});
		} catch (error) {
			set({ error: "Failed to update member details", loading: false });
			throw error;
		}
	},

	deleteMember: async (memberId: number) => {
		set({ loading: true, error: null });
		try {
			await memberService.deleteMember(memberId);
			set((state) => ({
				members: state.members.filter((member) => member.id !== memberId),
				loading: false,
			}));
		} catch (error) {
			set({ error: "Failed to delete member", loading: false });
			throw error;
		}
	},
}));

export default useMemberStore;
