import { Pagination } from '@/utils/pagination';
import { create } from 'zustand';

const usePharmacyPagination = create<PaginationType>(Pagination);

export default usePharmacyPagination;
