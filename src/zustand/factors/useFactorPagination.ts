import { Pagination } from '@/utils/pagination';
import { create } from 'zustand';

const useFactorPagination = create<PaginationType>(Pagination);

export default useFactorPagination;
