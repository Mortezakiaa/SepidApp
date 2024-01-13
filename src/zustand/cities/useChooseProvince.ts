import { create } from 'zustand';

type State = {
  provinceId: number;
  setProvinceId: (provinceId: number) => void;
};

const useChosenProvince = create<State>((set) => ({
  provinceId: 0,
  setProvinceId: (provinceId) => set({ provinceId }),
}));
export default useChosenProvince;
