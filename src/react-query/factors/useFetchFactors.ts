import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import useFactorSetTab from '@/zustand/factors/useFactorSetTab.ts';
import useFilterFactor from '@/zustand/factors/useFilterFactor.ts';
import useFactorPagination from '@/zustand/factors/useFactorPagination.ts';

export default function useFetchFactors() {
  const activeTab = useFactorSetTab((state) => state.activeTab);
  const search = useFilterFactor((state) => state.name);
  const service = useFilterFactor((state) => state.service);
  const page = useFactorPagination((state) => state.activePage);
  const rowPerPage = useFactorPagination((state) => state.rowPerPage);
  async function fetchFactors() {
    const filter = {
      status: activeTab === 'All' ? undefined : activeTab,
      type: service === 'All' ? undefined : service,
      pharmacy: search,
    };

    const res = await Axios.get<Factor[]>('/factor', {
      filter: filter,
      page,
      take: rowPerPage,
      relation: { factor_items: true, pharmacy: true, creator: true },
    });
    return res.data;
  }
  return useQuery({ queryKey: ['factors', { activeTab, search, page, service, rowPerPage }], queryFn: fetchFactors });
}
