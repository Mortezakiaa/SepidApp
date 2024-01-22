import { useMutation } from '@tanstack/react-query';
import Axios from '@utils/axios.ts';

type OrderBody = {
  _factors: Factor[];
} & Partial<Order>;
export default function useCreateOrder() {
  async function createOrder(data: OrderBody) {
    const res = await Axios.post<Order>('/order', data);
    return res.data;
  }
  return useMutation({ mutationKey: ['order', createOrder] });
}
