export function getMonthDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Get stored events
    const storedEvents = getStoredEvents();

    // Adjust weekday calculation
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Left shift weekdays
    const lastDayOfWeek = (lastDay.getDay() + 6) % 7; // Same adjustment

    // Add days from previous month to fill the first week
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month, -i);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            events: getEventsForDate(date, storedEvents),
        });
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        days.push({
            date,
            isCurrentMonth: true,
            isToday: isToday(date),
            events: getEventsForDate(date, storedEvents),
        });
    }

    // Add days from next month to complete the last week
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        const date = new Date(year, month + 1, i);
        days.push({
            date,
            isCurrentMonth: false,
            isToday: isToday(date),
            events: getEventsForDate(date, storedEvents),
        });
    }

    return days;
}

export function formatDate(date) {
    const indianOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istDate = new Date(date.getTime() + indianOffset); // Adjust to IST
    const year = istDate.getUTCFullYear();
    const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(istDate.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

export function getStoredEvents() {
    const stored = localStorage.getItem('calendar-events');
    return stored ? JSON.parse(stored) : {};
}

export function saveEvent(event) {
    const events = getStoredEvents();
    if (!events[event.date]) {
        events[event.date] = [];
    }

    // Check for overlapping events
    const hasOverlap = events[event.date].some((existingEvent) => {
        return (
            existingEvent.id !== event.id &&
            ((event.startTime >= existingEvent.startTime &&
                event.startTime < existingEvent.endTime) ||
                (event.endTime > existingEvent.startTime &&
                    event.endTime <= existingEvent.endTime))
        );
    });

    if (hasOverlap) {
        throw new Error('Event overlaps with an existing event');
    }

    const existingIndex = events[event.date].findIndex((e) => e.id === event.id);
    if (existingIndex >= 0) {
        events[event.date][existingIndex] = event;
    } else {
        events[event.date].push(event);
    }

    localStorage.setItem('calendar-events', JSON.stringify(events));
}

export function deleteEvent(event) {
    const events = getStoredEvents();
    if (events[event.date]) {
        events[event.date] = events[event.date].filter((e) => e.id !== event.id);
        if (events[event.date].length === 0) {
            delete events[event.date];
        }
        localStorage.setItem('calendar-events', JSON.stringify(events));
    }
}

function getEventsForDate(date, events) {
    const dateStr = formatDate(date);
    return events[dateStr] || [];
}

export function exportEvents(year, month) {
    const events = getStoredEvents();
    const monthEvents = [];

    Object.entries(events).forEach(([date, dayEvents]) => {
        const eventDate = new Date(date);
        if (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month
        ) {
            monthEvents.push(...dayEvents);
        }
    });

    return JSON.stringify(monthEvents, null, 2);
}
