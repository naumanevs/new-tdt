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
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
      return;
    }

    if (user) {
      const { data, error: creditsError } = await supabase
        .from('credits')
        .select('amount')
        .eq('user_id', user.id)
        .single();

      if (creditsError) {
        console.error('Error fetching credits:', creditsError);
        return;
      }

      set({ credits: data ? data.amount : 0 });
    }
  },
}));
