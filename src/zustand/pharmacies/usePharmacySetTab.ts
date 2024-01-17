import { create } from 'zustand';

type TabState = {
  activeTab: 'All' | 'active' | 'inactive';
  setActiveTab: (event: any, tab: 'All' | 'active' | 'inactive') => void;
};

const usePharmacyTab = create<TabState>((set) => ({
  activeTab: 'All',
  setActiveTab: (_, tab) => set({ activeTab: tab }),
}));

export default usePharmacyTab;
