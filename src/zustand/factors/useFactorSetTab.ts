import { create } from 'zustand';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';

type TabState = {
  activeTab: 'All' | FactorStatusEnum;
  setActiveTab: (event: any, tab: 'All' | FactorStatusEnum) => void;
};

const useFactorSetTab = create<TabState>((set) => ({
  activeTab: 'All',
  setActiveTab: (_, tab) => set({ activeTab: tab }),
}));

export default useFactorSetTab;
