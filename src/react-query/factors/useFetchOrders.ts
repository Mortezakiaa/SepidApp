import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchOrders() {
  async function fetchOrders() {
    const res = await Axios.get<Order[]>('/order', { relation: { factors: true, pharmacy: true, creator: true } });
    return res.data.result;
  }
  return useQuery({ queryKey: ['orders'], queryFn: fetchOrders });
}
