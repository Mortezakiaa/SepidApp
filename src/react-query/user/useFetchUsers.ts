import ApiService from '@/utils/axios';
import useUsersTabState from '@/zustand/users/useUserSetTab';
import useUsersPagination from '@/zustand/users/useUsersPagination';
import { useQuery } from '@tanstack/react-query';
import useFilterUser from '@/zustand/users/useFilterUser.ts';

export default function useFetchUsers() {
  const setTotal = useUsersPagination((state) => state.setTotal);
  const activePage = useUsersPagination((state) => state.activePage);
  const activeTab = useUsersTabState((state) => state.activeTab);
  const full_name = useFilterUser((state) => state.fullName);
  const role = useFilterUser((state) => state.role);
  async function fetchUsers() {
    const filter = { full_name };
    if (activeTab !== 'All') Object.assign(filter, { status: activeTab });
    if (role !== 'all') Object.assign(filter, { role });
    const res = await ApiService.get<User[]>('/user', {
      filter: filter,
      page: activePage,
    });
    setTotal(res.data.pagination.lastPage);
    return res.data;
  }
  return useQuery({ queryKey: ['users', { activeTab, activePage, role, full_name }], queryFn: fetchUsers });
}
