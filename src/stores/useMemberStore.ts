import { create } from "zustand";
import {
	Member,
	CreateMember,
	UpdateMemberRole,
	PaginatedMembers,
} from "../shared/types/member.types";
import memberService from "../services/memberService";
import { QueryParams } from "../shared/types/query-params.types";

type MemberState = {
	members: PaginatedMembers | null;
	member: Member | null;
	loading: {
		list: boolean;
		detail: boolean;
		create: boolean;
		update: boolean;
		delete: boolean;
	};
	error: string | null;
	getMembers: (partyId: number, queryParams?: QueryParams) => Promise<void>;
	getMember: (partyId: number, memberId: number) => Promise<void>;
	createMember: (member: CreateMember) => Promise<number>;
	updateMemberRole: (
		id: number,
		updatedDetails: UpdateMemberRole,
	) => Promise<void>;
	deleteMember: (id: number) => Promise<void>;
};

export const useMemberStore = create<MemberState>((set) => ({
	members: null,
	member: null,
	loading: {
		list: false,
		detail: false,
		create: false,
		update: false,
		delete: false,
	},
	error: null,

	getMembers: async (partyId: number, queryParams?: QueryParams) => {
		set((state) => ({
			loading: { ...state.loading, list: true },
			error: null,
		}));
		try {
			const members = await memberService.getAllMembers(partyId, queryParams);
			set({ members });
		} catch (error) {
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, list: true },
				error: null,
			}));
		}
	},

	getMember: async (partyId: number, memberId: number) => {
		set((state) => ({
			loading: { ...state.loading, detail: true },
			error: null,
		}));
		try {
			const member = await memberService.getMemberById(partyId, memberId);
			set({ member });
		} catch (error) {
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, detail: false },
				error: null,
			}));
		}
	},

	createMember: async (member: CreateMember): Promise<number> => {
		set((state) => ({
			loading: { ...state.loading, create: true },
			error: null,
		}));
		try {
			const newMember = await memberService.createMember(member);
			set((state) => ({
				members: state.members
					? {
							...state.members,
							items: [newMember, ...state.members.items],
							totalCount: state.members.totalCount + 1,
					  }
					: {
							items: [newMember],
							totalCount: 1,
							totalPages: 1,
							currentPage: 1,
							hasNextPage: false,
							hasPreviousPage: false,
							pageRange: [],
					  },
			}));
			return newMember.id;
		} catch (error) {
			set({ error: "Failed to create member" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, create: false },
				error: null,
			}));
		}
	},

	updateMemberRole: async (
		id: number,
		updatedMemberRole: UpdateMemberRole,
	): Promise<void> => {
		set((state) => ({
			loading: { ...state.loading, update: true },
			error: null,
		}));
		try {
			const updatedMember = await memberService.updateMemberRole(
				id,
				updatedMemberRole,
			);
			set((state) => {
				const updatedMembers = state.members
					? state.members.items.map((member) =>
							member.id === id ? { ...member, ...updatedMember } : member,
					  )
					: [];
				return {
					members: state.members
						? { ...state.members, items: updatedMembers }
						: null,
					member:
						state.member?.id === id
							? { ...state.member, ...updatedMember }
							: state.member,
				};
			});
		} catch (error) {
			set({ error: "Failed to update member details" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, update: false },
				error: null,
			}));
		}
	},

	deleteMember: async (memberId: number) => {
		set((state) => ({
			loading: { ...state.loading, delete: true },
			error: null,
		}));
		try {
			await memberService.deleteMember(memberId);
			set((state) => ({
				members: state.members
					? {
							...state.members,
							items: state.members.items.filter(
								(member) => member.id !== memberId,
							),
							totalCount: state.members.totalCount - 1,
					  }
					: null,
			}));
		} catch (error) {
			set({ error: "Failed to delete member" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, delete: false },
				error: null,
			}));
		}
	},
}));

export default useMemberStore;
