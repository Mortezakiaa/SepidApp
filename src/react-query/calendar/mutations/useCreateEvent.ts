import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useCreateEvent() {
  return useMutation({
    mutationKey: ['calendar_event'],
    mutationFn: (newEvent: any) => axios.post('/api/calendar/events/new', newEvent),
  });
}
