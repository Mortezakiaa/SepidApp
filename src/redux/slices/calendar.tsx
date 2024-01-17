import { create } from 'zustand';

interface CalendarStatesInterface {
  isOpenModal: boolean;

  selectedEventId: number;

  selectEvent: (event: number) => void;

  selectedRange: { start: number; end: number };

  setRange: (start: Date, end: Date) => void;

  openModal: () => void;

  closeModal: () => void;
}
const useCalendarStates = create<CalendarStatesInterface>((set) => ({
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
  setRange: (start, end) => set(() => ({ selectedRange: { start: start.getTime(), end: end.getTime() } })),
  openModal: () => set(() => ({ isOpenModal: true })),
  closeModal: () => set(() => ({ isOpenModal: false })),
  selectEvent: (event) => set(() => ({ selectedEventId: event })),
}));

export default useCalendarStates;
