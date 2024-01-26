import { Pagination } from '@/utils/pagination';
import { create } from 'zustand';

const useOrderPagination = create<PaginationType>(Pagination);

export default useOrderPagination;
