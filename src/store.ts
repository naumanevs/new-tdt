import { create, SetState } from 'zustand';
import { supabase } from './supabaseClient';

interface UserState {
  user: any | null;
  credits: number;
  setUser: (user: any | null) => void;
  setCredits: (credits: number) => void;
  fetchCredits: () => Promise<void>;
}

export const useUserStore = create<UserState>((set: SetState<UserState>) => ({
  user: null,
  credits: 0,
  setUser: (user: any | null) => set({ user }),
  setCredits: (credits: number) => set({ credits }),
  fetchCredits: async () => {
    const user = supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('credits')
        .select('amount')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching credits:', error);
        return;
      }

      set({ credits: data ? data.amount : 0 });
    }
  },
}));
