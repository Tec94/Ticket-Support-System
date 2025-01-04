import { Input } from '@/components/ui/input';
import { TicketPriority, TicketStatus } from '@/types/ticket';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';

interface TicketSearchProps {
  onSearchChange: (search: string) => void;
  onPriorityChange: (priority: TicketPriority | null) => void;
  onStatusChange: (status: TicketStatus | null) => void;
}

export function TicketSearch({
  onSearchChange,
  onPriorityChange,
  onStatusChange,
}: TicketSearchProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40">
      <div className="flex h-14 items-center px-4 gap-4 max-w-[2000px] mx-auto w-full">
        <Input
          placeholder="Search tickets..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Priority
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onPriorityChange(null)}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityChange('low')}>Low</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityChange('medium')}>Medium</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityChange('high')}>High</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onPriorityChange('critical')}>Critical</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onStatusChange(null)}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('open')}>Open</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('in-progress')}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('resolved')}>Resolved</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange('closed')}>Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}