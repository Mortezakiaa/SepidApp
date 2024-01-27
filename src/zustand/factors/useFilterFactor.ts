import { create } from 'zustand';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';

type FilterFactorState = {
  name: string;
  setName: (name: string) => void;
  service: 'All' | FactorTypeEnum;
  setService: (service: 'All' | FactorTypeEnum) => void;
};

const useFilterFactor = create<FilterFactorState>((set) => ({
  name: '',
  setName: (name) => set({ name }),
  service: 'All',
  setService: (service) => set({ service }),
}));

export default useFilterFactor;
