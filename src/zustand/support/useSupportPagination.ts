import { Pagination } from '@/utils/pagination';
import { create } from 'zustand';

const useSupportPagination = create<PaginationType>(Pagination);

export default useSupportPagination;
