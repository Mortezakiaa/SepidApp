import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';
import useOrderSetTab from '@/zustand/orders/useOrderSetTab.ts';
import useFilterOrder from '@/zustand/orders/useFilterOrder.ts';
import useOrderPagination from '@/zustand/orders/useOrderPagination.ts';

export default function useFetchOrders() {
  const activeTab = useOrderSetTab((state) => state.activeTab);
  const search = useFilterOrder((state) => state.name);
  const service = useFilterOrder((state) => state.service);
  const page = useOrderPagination((state) => state.activePage);
  const rowPerPage = useOrderPagination((state) => state.rowPerPage);
  async function fetchOrders() {
    const filter = {
      status: activeTab === 'All' ? undefined : activeTab,
      type: service === 'All' ? undefined : service,
    };

    const res = await Axios.get<Order[]>('/order', {
      filter: filter,
      page,
      take: rowPerPage,
      relation: { factors: true, pharmacy: true, creator: true },
    });
    return res.data;
  }
  return useQuery({ queryKey: ['orders', { activeTab, search, page, service, rowPerPage }], queryFn: fetchOrders });
}
