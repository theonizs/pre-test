import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  authToken: string | null;
  isLoading: boolean;
  votes: { [quoteId: string]: "up" | "down" };
  setUser: (params: { user: User; token: string }) => void;
  setLogout: () => Promise<void>;
  handleVote: (quoteId: string, voteType: "up" | "down") => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authToken: null,
      votes: {},
      setUser: (params: { user: User; token: string }) => {
        set({
          user: params.user,
          isAuthenticated: true,
          authToken: params.token,
          isLoading: false,
        });
      },
      setLogout: async () => {
        set({ user: null, isAuthenticated: false, authToken: null });
      },

      handleVote: (quoteId, voteType) => {
        const currentVotes = { ...get().votes };
        const existingVote = currentVotes[quoteId];

        if (existingVote === voteType) {
          // กรณีที่ 1: กดซ้ำที่ปุ่มเดิม (Upvote แล้วกด Upvote อีก) -> ยกเลิกการโหวต
          delete currentVotes[quoteId];
        } else {
          // กรณีที่ 2: โหวตครั้งแรก หรือเปลี่ยนใจ (จาก Upvote เป็น Downvote)
          currentVotes[quoteId] = voteType;
        }

        set({ votes: currentVotes });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
