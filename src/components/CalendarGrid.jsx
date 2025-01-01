import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function CalendarGrid({ days, onSelectDay }) {
  return (
    <div className="flex items-center justify-center bg-muted p-4">
      <div className="grid grid-cols-7 gap-2  w-full max-w-full p-4  bg-white rounded-lg shadow-lg">
        {WEEKDAYS.map((day, index) => (
          <div
            key={index}
            className={cn(
              'text-center text-xs sm:text-sm md:text-base font-semibold p-2 sm:p-4',
              index >= 5 && 'text-red-500' // Differentiate weekends
            )}
          >
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onSelectDay(day.date)}
            className={cn(
              'relative min-h-[80px] sm:min-h-[100px] md:min-h-[120px] rounded-lg border p-2 sm:p-4 text-left transition-all w-full',
              !day.isCurrentMonth && 'bg-gray-100 text-gray-400',
              day.isCurrentMonth && 'bg-white text-black hover:shadow-lg hover:bg-gray-50',
              day.isToday && 'border-primary bg-primary/10 text-primary border-2', // Highlight current day
              'group'
            )}
          >
            <span
              className={cn(
                'absolute top-1 right-1 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs sm:text-sm font-medium',
                day.isToday && 'bg-primary text-white'
              )}
            >
              {day.date.getDate()}
            </span>
            <div className="mt-4 space-y-2">
              {day.events.map((event) => (
                <Badge
                  key={event.id}
                  variant="secondary"
                  className={cn(
                    'block truncate text-xs sm:text-sm md:text-base rounded-md py-1 px-2 sm:py-2 sm:px-4',
                    'max-w-full overflow-hidden text-ellipsis',
                    event.color === 'work' && 'bg-blue-100 text-blue-900',
                    event.color === 'personal' && 'bg-green-100 text-green-900',
                    event.color === 'other' && 'bg-purple-100 text-purple-900',
                    'hover:opacity-80'
                  )}
                >
                  {event.title}
                </Badge>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;
