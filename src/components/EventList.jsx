import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Edit } from 'lucide-react';

function EventList({ isOpen, onClose, events, onEditEvent, onDeleteEvent, selectedDate }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter events based on search term
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Events for {selectedDate.toLocaleDateString()}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="mt-4 space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.startTime} - {event.endTime}
                  </p>
                  {event.description && (
                    <p className="text-sm mt-1">{event.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="bg-blue-600"
                    onClick={() => onEditEvent(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    className="bg-red-400"
                    onClick={() => onDeleteEvent(event)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {filteredEvents.length === 0 && (
              <p className="text-center text-muted-foreground">
                No events found
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default EventList;
