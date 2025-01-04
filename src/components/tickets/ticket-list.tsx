import { TicketCard } from '@/components/tickets/ticket-card';
import { TicketSearch } from '@/components/tickets/ticket-search';
import { useTickets } from '@/hooks/use-tickets';
import { TicketPriority, TicketStatus } from '@/types/ticket';
import { useState } from 'react';

export function TicketList() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | null>(null);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | null>(null);
  const { tickets, loading, error, updateTicket } = useTickets();

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div>Error loading tickets: {error.message}</div>;
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      search === '' ||
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = priorityFilter === null || ticket.priority === priorityFilter;
    const matchesStatus = statusFilter === null || ticket.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="flex flex-col w-full">
      <TicketSearch
        onSearchChange={setSearch}
        onPriorityChange={setPriorityFilter}
        onStatusChange={setStatusFilter}
      />
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-[2000px] mx-auto w-full">
        {filteredTickets.map((ticket) => (
          <TicketCard 
            key={ticket.id} 
            ticket={ticket}
            onUpdateTicket={async (updates) => {
              await updateTicket(ticket.id, updates);
            }}
          />
        ))}
      </div>
    </div>
  );
}