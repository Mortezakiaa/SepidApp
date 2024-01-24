import { useQuery } from '@tanstack/react-query';
import ApiService from '@utils/axios.ts';
import usePharmacyTab from '@/zustand/pharmacies/usePharmacySetTab.ts';
import useFilterPharmacy from '@/zustand/pharmacies/useFilterPharmacy.ts';
import usePharmacyPagination from '@/zustand/pharmacies/usePharmacyPagination.ts';
import { useShallow } from 'zustand/react/shallow';

export default function useFetchPharmacies() {
  const name = useFilterPharmacy((state) => state.name);
  const activeTab = usePharmacyTab((state) => state.activeTab);
  const { rowPerPage, page } = usePharmacyPagination(
    useShallow((state) => ({ page: state.activePage, rowPerPage: state.rowPerPage }))
  );

  return useQuery({
    queryKey: ['pharmacies', { name, activeTab }],
    queryFn: async () => {
      const filter: Partial<Pharmacy> = { name };
      if (activeTab !== 'All') {
        filter.is_active = activeTab === 'active';
      }
      const res = await ApiService.get<Pharmacy[]>('/pharmacy', {
        relation: { city: true },
        take: rowPerPage,
        page: page,
        filter,
      });
      return res.data;
    },
    retry: 2,
  });
}

export function useFetchAllPharmacies() {
  return useQuery({
    queryKey: ['pharmacies'],
    queryFn: async () => {
      const res = await ApiService.get<Pharmacy[]>('/pharmacy', {
        take: 1000,
        select: {
          id: true,
          name: true,
        },
      });
      return res.data;
    },
    retry: 2,
  });
}
