import { create } from 'zustand';

type FilterUserState = {
  name: string;
  setName: (name: string) => void;
};

const useFilterPharmacy = create<FilterUserState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));

export default useFilterPharmacy;
