import { Pagination } from '@/utils/pagination';
import { create } from 'zustand';

const useUsersPagination = create<PaginationType>(Pagination);

export default useUsersPagination;
