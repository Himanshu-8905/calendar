import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 mx-auto">
      <Button
        onClick={onPrevMonth}
        className="h-8 w-8 sm:h-10 sm:w-10 text-sm sm:text-lg hover:bg-gray-500"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <h2 className="text-base sm:text-xl font-bold text-gray-700">
        {currentDate.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })}
      </h2>
      <Button
        onClick={onNextMonth}
        className="h-8 w-8 sm:h-10 sm:w-10 text-sm sm:text-lg hover:bg-gray-500"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
}

export default CalendarHeader;
