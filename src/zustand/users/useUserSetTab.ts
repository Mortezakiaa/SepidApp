import { UserStatusEnum } from '@/types/enums/user-status.enum';
import { create } from 'zustand';

type TabState = {
  activeTab: 'All' | UserStatusEnum.ACTIVE | UserStatusEnum.INACTIVE;
  setActiveTab: (event: any, tab: 'All' | UserStatusEnum) => void;
};

const useUsersTabState = create<TabState>((set) => ({
  activeTab: 'All',
  setActiveTab: (_, tab) => set({ activeTab: tab }),
}));

export default useUsersTabState;
