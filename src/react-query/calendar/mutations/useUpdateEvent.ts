import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useUpdateEvent() {
  return useMutation({
    mutationKey: ['calendar_event'],
    mutationFn: ({ eventId, updateEvent }: { eventId: number; updateEvent: any }) =>
      axios.post('/api/calendar/events/new', {
        eventId,
        updateEvent,
      }),
  });
}
