import { useRouter } from 'next/router';
import Axios from '@utils/axios.ts';
import { useQuery } from '@tanstack/react-query';

export default function useFetchPharmacyUsers() {
  const router = useRouter();
  const { id } = router.query;
  async function fetchPharmacyUsers() {
    const res = await Axios.get(`/pharmacy/${id}/users`);
    return res.data;
  }
  return useQuery({ queryKey: ['pharmacyUsers', { id }], queryFn: fetchPharmacyUsers });
}
