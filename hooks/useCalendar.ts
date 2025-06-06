
import { useState, useMemo, useCallback } from 'react';
import { CalendarDay } from '../types';

const DAYS_IN_WEEK = 7;
const MAX_CELLS = 6 * DAYS_IN_WEEK; // 42 cells for a 6x7 grid

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the first day of the month (0 for Sunday, 1 for Monday, etc.)
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// Helper function to check if two dates are the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Helper function to check if a date is before today
const isBeforeToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of day
  return date < today;
};


export const useCalendar = (initialLocale: string = 'en-US') => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [locale] = useState(initialLocale); // Locale can be a prop if needed for dynamic changes

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = useMemo(() => 
    new Intl.DateTimeFormat(locale, { month: 'long' }).format(currentDate), 
    [currentDate, locale]
  );

  const yearName = useMemo(() => 
    new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(currentDate),
    [currentDate, locale]
  );

  const weekdayNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    // Get weekdays starting from Sunday (locale-dependent, but often Sunday for 'en-US')
    // For 'en-US', Sunday is day 0. new Date(2023, 0, 1) is Sunday, Jan 1, 2023
    return Array.from({ length: DAYS_IN_WEEK }, (_, i) => {
        const day = new Date(2023, 0, 1 + i); // A known week starting with Sunday
        return formatter.format(day);
    });
  }, [locale]);


  const calendarGrid = useMemo<CalendarDay[]>(() => {
    const daysInCurrentMonth = getDaysInMonth(year, month);
    const firstDayOfCurrentMonth = getFirstDayOfMonth(year, month); // 0 for Sunday, 1 for Mon...

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    const grid: CalendarDay[] = [];
    const today = new Date();

    // Previous month's trailing days
    for (let i = 0; i < firstDayOfCurrentMonth; i++) {
      const dayOfMonth = daysInPrevMonth - firstDayOfCurrentMonth + 1 + i;
      const date = new Date(prevMonthYear, prevMonth, dayOfMonth);
      grid.push({
        date,
        dayOfMonth,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isDisabled: isBeforeToday(date),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(year, month, i);
      grid.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: true,
        isToday: isSameDay(date, today),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isDisabled: isBeforeToday(date),
      });
    }

    // Next month's leading days
    const remainingCells = MAX_CELLS - grid.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;

    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(nextMonthYear, nextMonth, i);
      grid.push({
        date,
        dayOfMonth: i,
        isCurrentMonth: false,
        isToday: isSameDay(date, today),
        isSelected: selectedDate ? isSameDay(date, selectedDate) : false,
        isDisabled: isBeforeToday(date),
      });
    }
    return grid;
  }, [year, month, selectedDate]);

  const navigateToPreviousMonth = useCallback(() => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  }, []);

  const navigateToNextMonth = useCallback(() => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  }, []);

  const handleSelectDate = useCallback((date: Date) => {
    const dayData = calendarGrid.find(d => isSameDay(d.date, date));
    if (dayData && !dayData.isDisabled) {
      setSelectedDate(date);
    }
  }, [calendarGrid]);

  return {
    currentDate,
    selectedDate,
    monthName,
    yearName,
    weekdayNames,
    calendarGrid,
    navigateToPreviousMonth,
    navigateToNextMonth,
    handleSelectDate,
  };
};
