export const Pagination = (set, getState) => ({
  activePage: 0,
  totalPages: 1,
  setTotal: (total: number) => set(() => ({ totalPages: total })),
  setPage: (pageNumber: number) => set(() => ({ activePage: pageNumber })),
  next: () =>
    set((state: PaginationType) => () => ({
      activePage: state.activePage + 1,
    })),
  first: () => set(() => ({ activePage: 1 })),
  previous: () =>
    set((state: PaginationType) => () => ({
      activePage: state.activePage - 1,
    })),
  rowPerPage: 5,
  setRowPerPage: (rowPerPage: number) => set(() => ({ rowPerPage })),
});
