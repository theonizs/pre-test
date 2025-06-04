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
  setUser: (params: { user: User; token: string }) => void;
  setLogout: () => Promise<void>;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      authToken: null,
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
