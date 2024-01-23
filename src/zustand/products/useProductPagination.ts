import { Pagination } from '@/utils/pagination';
import { create } from 'zustand';

const useProductPagination = create<PaginationType>(Pagination);

export default useProductPagination;
