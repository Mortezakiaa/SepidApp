import { create } from 'zustand';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';

type FilterUserState = {
  name: string;
  setName: (name: string) => void;
  service: 'All' | FactorTypeEnum;
  setService: (service: 'All' | FactorTypeEnum) => void;
};

const useFilterOrder = create<FilterUserState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
  service: 'All',
  setService: (service) => set({ service }),
}));

export default useFilterOrder;
