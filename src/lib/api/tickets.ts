import { supabase } from '../supabase';
import { Ticket } from '@/types/ticket';
import { transformTicketData } from './transforms';

export async function fetchTickets() {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      assigned_to_profile:profiles!tickets_assigned_to_fkey(email),
      reported_by_profile:profiles!tickets_reported_by_fkey(email)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(transformTicketData);
}

export async function updateTicket(id: string, updates: Partial<Ticket>) {
  const { error } = await supabase
    .from('tickets')
    .update(updates)
    .eq('id', id);
  
  if (error) throw error;
}