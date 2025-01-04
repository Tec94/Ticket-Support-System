import { Ticket } from '@/types/ticket';

export function transformTicketData(data: any): Ticket {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    assignedTo: data.assigned_to_profile?.email,
    reportedBy: data.reported_by_profile?.email,
  };
}