import ApiService from '@/utils/axios';
import useUsersTabState from '@/zustand/users/useUserSetTab';
import useUsersPagination from '@/zustand/users/useUsersPagination';
import { useQuery } from '@tanstack/react-query';
import useFilterUser from '@/zustand/users/useFilterUser.ts';
import { useShallow } from 'zustand/react/shallow';

export default function useFetchUsers() {
  const { take, page, setTotal } = useUsersPagination(
    useShallow((state) => ({
      setTotal: state.setTotal,
      page: state.activePage,
      take: state.rowPerPage,
    }))
  );
  const activeTab = useUsersTabState((state) => state.activeTab);
  const full_name = useFilterUser((state) => state.fullName);
  const role = useFilterUser((state) => state.role);
  async function fetchUsers() {
    const filter = { full_name };
    if (activeTab !== 'All') Object.assign(filter, { status: activeTab });
    if (role !== 'all') Object.assign(filter, { role });
    const res = await ApiService.get<User[]>('/user', {
      filter: filter,
      page,
      take,
    });
    setTotal(res.data.pagination.lastPage);
    return res.data;
  }
  return useQuery({ queryKey: ['users', { activeTab, page, role, full_name, take }], queryFn: fetchUsers });
}
