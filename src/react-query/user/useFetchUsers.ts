import ApiService from '@/utils/axios';
import useUsersTabState from '@/zustand/users/useUserSetTab';
import useUsersPagination from '@/zustand/users/useUsersPagination';
import { useQuery } from '@tanstack/react-query';

export default function useFetchUsers() {
  const setTotal = useUsersPagination((state) => state.setTotal);
  const activePage = useUsersPagination((state) => state.activePage);
  const activeTab = useUsersTabState((state) => state.activeTab);
  async function fetchUsers() {
    const res = await ApiService.get<User[]>('/user', {
      filter: activeTab !== 'All' ? { status: activeTab } : null,
      page: activePage - 1,
    });
    setTotal(res.data.pagination.lastPage);
    return res.data;
  }
  return useQuery({ queryKey: ['users', { activeTab, activePage }], queryFn: fetchUsers });
}
