import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import  CalendarHeader  from '@/components/CalendarHeader';
import  CalendarGrid  from '@/components/CalendarGrid';
import  EventDialog from '@/components/EventDialog';
import  EventList  from '@/components/EventList';
import { getMonthDays, saveEvent, deleteEvent, exportEvents } from '@/lib/calender';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(undefined);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  const { toast } = useToast();

  const days = getMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleSelectDay = (date) => {
    setSelectedDate(date);
    setShowEventList(true);
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      setSelectedEvent(undefined);
      setShowEventDialog(true);
    }
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setShowEventDialog(true);
  };

  const handleSaveEvent = (event) => {
    try {
      saveEvent(event);
      setShowEventDialog(false);
      setCurrentDate(new Date(currentDate)); // Trigger re-render
      toast({
        title: 'Success',
        description: `Event ${event.id ? 'updated' : 'created'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteEvent = (event) => {
    deleteEvent(event);
    setCurrentDate(new Date(currentDate)); // Trigger re-render
    toast({
      title: 'Success',
      description: 'Event deleted successfully',
    });
  };

  const handleExportEvents = () => {
    const eventsJson = exportEvents(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const blob = new Blob([eventsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `events-${currentDate.toISOString().slice(0, 7)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8 mx-4 sm:mx-16 justify-center items-center">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-4xl font-bold">Event Calendar</h1>
          <div className="flex space-x-2 sm:space-x-4">
            <Button onClick={handleExportEvents}>
              <Download className="mr-2 h-4 w-4" />
              Export Events
            </Button>
            {selectedDate && (
              <Button onClick={handleAddEvent}>Add Event</Button>
            )}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          <CalendarGrid days={days} onSelectDay={handleSelectDay} />
        </div>

        {selectedDate && (
          <>
            <EventDialog
              isOpen={showEventDialog}
              onClose={() => setShowEventDialog(false)}
              onSave={handleSaveEvent}
              selectedDate={selectedDate}
              event={selectedEvent}
            />
            <EventList
              isOpen={showEventList}
              onClose={() => setShowEventList(false)}
              events={days.find(
                (day) => day.date.toDateString() === selectedDate.toDateString()
              )?.events || []}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              selectedDate={selectedDate}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
