import { create } from 'zustand';

type FilterUserState = {
  role: string;
  fullName: string;
  setRole: (role: string) => void;
  setFullName: (fullName: string) => void;
};

const useFilterUser = create<FilterUserState>((set) => ({
  role: 'all',
  fullName: '',
  setFullName: (fullName) => set({ fullName }),
  setRole: (role) => set({ role }),
}));

export default useFilterUser;
