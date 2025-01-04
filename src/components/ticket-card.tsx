import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Ticket, TicketPriority, TicketStatus } from '@/types/ticket';
import { Clock, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const priorityColors: Record<TicketPriority, string> = {
  low: 'bg-blue-500/10 text-blue-500',
  medium: 'bg-yellow-500/10 text-yellow-500',
  high: 'bg-orange-500/10 text-orange-500',
  critical: 'bg-red-500/10 text-red-500',
};

const statusColors: Record<TicketStatus, string> = {
  open: 'bg-green-500/10 text-green-500',
  'in-progress': 'bg-blue-500/10 text-blue-500',
  resolved: 'bg-purple-500/10 text-purple-500',
  closed: 'bg-gray-500/10 text-gray-500',
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex gap-2">
          <Badge variant="outline" className={priorityColors[ticket.priority]}>
            {ticket.priority}
          </Badge>
          <Badge variant="outline" className={statusColors[ticket.status]}>
            {ticket.status}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{ticket.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{ticket.reportedBy}</span>
          </div>
          {ticket.assignedTo && (
            <div className="text-muted-foreground">
              Assigned to: {ticket.assignedTo}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}