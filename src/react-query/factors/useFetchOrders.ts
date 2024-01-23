import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchOrders() {
  async function fetchOrders() {
    const res = await Axios.get<Order[]>('/order');
    return res.data;
  }
  return useQuery({ queryKey: ['order'], queryFn: fetchOrders });
}
