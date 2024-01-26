import { useRouter } from 'next/router';
import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import useFilterUser from '@/zustand/users/useFilterUser.ts';
import { useShallow } from 'zustand/react/shallow';
import useUsersPagination from '@/zustand/users/useUsersPagination.ts';
import useUsersTabState from '@/zustand/users/useUserSetTab.ts';

export default function useFetchPharmacyUsers() {
  const router = useRouter();
  const { id } = router.query;
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
  async function fetchPharmacyUsers() {
    const filter = { full_name };
    if (activeTab !== 'All') Object.assign(filter, { status: activeTab });
    if (role !== 'all') Object.assign(filter, { role });
    const res = await Axios.get<User[]>(`/pharmacy/${id}/users`, { filter: filter, page, take });
    return res.data;
  }
  return useQuery({
    queryKey: ['pharmacyUsers', { id, activeTab, page, role, full_name, take }],
    queryFn: fetchPharmacyUsers,
  });
}
