import { create } from 'zustand';

type ModalNames = 'PharmacyUser' | string;

type ModalManagerType = { name: ModalNames; data?: any };

type ModalManagerInt = {
  isOpen: ModalManagerType[];
  openModal: (name: ModalManagerType) => void;
  closeModal: (name: ModalNames) => void;
  findModal: (name: ModalNames) => ModalManagerType | undefined;
};

const useModalManager = create<ModalManagerInt>((set, get) => ({
  isOpen: [],
  findModal: (name) => get().isOpen.find((n) => n.name === name),
  closeModal: (name) => set((state) => ({ isOpen: state.isOpen.filter((n) => n.name !== name) })),
  openModal: (name) => set((state) => ({ isOpen: [...state.isOpen, name] })),
}));

export default useModalManager;
