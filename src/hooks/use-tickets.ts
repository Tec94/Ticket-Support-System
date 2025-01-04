import { useEffect, useState } from 'react';
import { Ticket } from '@/types/ticket';
import { fetchTickets, updateTicket } from '@/lib/api/tickets';
import { supabase } from '@/lib/supabase';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    loadTickets();

    // Subscribe to changes
    const subscription = supabase
      .channel('tickets')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, loadTickets)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    tickets,
    loading,
    error,
    updateTicket,
  };
}