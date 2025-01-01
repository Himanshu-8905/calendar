// import React from 'react';
// import { Badge } from '@/components/ui/badge';
// import { cn } from '@/lib/utils';

// const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// function CalendarGrid({ days, onSelectDay }) {
//   return (
//     <div className="flex items-center justify-center bg-muted">
//       <div className="grid grid-cols-7 gap-8 lg:gap-12 w-full max-w-full p-8 bg-white rounded-lg shadow-lg">
//         {WEEKDAYS.map((day, index) => (
//           <div
//             key={index}
//             className={cn(
//               'text-center text-base md:text-lg lg:text-xl font-semibold p-6',
//               index >= 5 && 'text-red-500' // Differentiate weekends
//             )}
//           >
//             {day}
//           </div>
//         ))}
//         {days.map((day, index) => (
//           <button
//             key={index}
//             onClick={() => onSelectDay(day.date)}
//             className={cn(
//               'relative min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[300px] rounded-lg border p-6 text-left transition-all w-full',
//               !day.isCurrentMonth && 'bg-gray-100 text-gray-400',
//               day.isCurrentMonth && 'bg-white text-black hover:shadow-lg hover:bg-gray-50',
//               day.isToday && 'border-primary bg-primary/10 text-primary border-2', // Highlight current day
//               'group'
//             )}
//           >
//             <span
//               className={cn(
//                 'absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-lg font-medium',
//                 day.isToday && 'bg-primary text-white'
//               )}
//             >
//               {day.date.getDate()}
//             </span>
//             <div className="mt-6 space-y-3">
//               {day.events.map((event) => (
//                 <Badge
//                   key={event.id}
//                   variant="secondary"
//                   className={cn(
//                     'block truncate text-sm md:text-base rounded-md py-3 px-6',
//                     event.color === 'work' && 'bg-blue-100 text-blue-900',
//                     event.color === 'personal' && 'bg-green-100 text-green-900',
//                     event.color === 'other' && 'bg-purple-100 text-purple-900',
//                     'hover:opacity-80'
//                   )}
//                 >
//                   {event.title}
//                 </Badge>
//               ))}
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CalendarGrid;



import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function CalendarGrid({ days, onSelectDay }) {
  return (
    <div className="flex items-center justify-center bg-muted p-4">
      <div className="grid grid-cols-7 gap-4 md:gap-8 lg:gap-12 w-full max-w-full p-8 bg-white rounded-lg shadow-lg">
        {WEEKDAYS.map((day, index) => (
          <div
            key={index}
            className={cn(
              'text-center text-sm md:text-base lg:text-lg font-semibold p-6',
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
              'relative min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[300px] rounded-lg border p-6 text-left transition-all w-full',
              !day.isCurrentMonth && 'bg-gray-100 text-gray-400',
              day.isCurrentMonth && 'bg-white text-black hover:shadow-lg hover:bg-gray-50',
              day.isToday && 'border-primary bg-primary/10 text-primary border-2', // Highlight current day
              'group'
            )}
          >
            <span
              className={cn(
                'absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-lg font-medium',
                day.isToday && 'bg-primary text-white'
              )}
            >
              {day.date.getDate()}
            </span>
            <div className="mt-6 space-y-3">
              {day.events.map((event) => (
                <Badge
                  key={event.id}
                  variant="secondary"
                  className={cn(
                    'block truncate text-sm md:text-base rounded-md py-3 px-6',
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
