import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ticket, TicketPriority, TicketStatus } from '@/types/ticket';
import { Clock, MoreVertical, User } from 'lucide-react';
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

interface TicketCardProps {
  ticket: Ticket;
  onUpdateTicket: (updates: Partial<Ticket>) => void;
}

export function TicketCard({ ticket, onUpdateTicket }: TicketCardProps) {
  return (
    <Card className="group relative hover:bg-accent/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex gap-2">
          <Badge variant="outline" className={priorityColors[ticket.priority]}>
            {ticket.priority}
          </Badge>
          <Badge variant="outline" className={statusColors[ticket.status]}>
            {ticket.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Update Ticket</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Priority</DropdownMenuLabel>
              {(['low', 'medium', 'high', 'critical'] as const).map((priority) => (
                <DropdownMenuItem
                  key={priority}
                  onClick={() => onUpdateTicket({ priority })}
                  className={ticket.priority === priority ? 'bg-accent' : ''}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              {(['open', 'in-progress', 'resolved', 'closed'] as const).map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onUpdateTicket({ status })}
                  className={ticket.status === status ? 'bg-accent' : ''}
                >
                  {status
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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