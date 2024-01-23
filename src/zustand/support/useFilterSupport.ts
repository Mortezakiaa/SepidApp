import { create } from 'zustand';

type FilterUserState = {
  title: string;
  setTitle: (title: string) => void;
};

const useFilterSupport = create<FilterUserState>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}));

export default useFilterSupport;
