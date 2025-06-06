
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarWidgetProps, CalendarDay, CalendarTask } from '../types';

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const XMarkIconWidget: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.177-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
    </svg>
);

const PencilIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
    </svg>
);

const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const CalendarWidgetComponent: React.FC<CalendarWidgetProps> = ({ isVisible, onClose }) => {
  const {
    monthName,
    yearName,
    weekdayNames,
    calendarGrid,
    navigateToPreviousMonth,
    navigateToNextMonth,
    handleSelectDate: hookHandleSelectDate,
    selectedDate,
    currentDate, 
  } = useCalendar('en-US');

  const widgetRef = useRef<HTMLDivElement>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [taskTimeInput, setTaskTimeInput] = useState('');
  const [editingTask, setEditingTask] = useState<CalendarTask | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('calendarTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showTaskForm) {
          setShowTaskForm(false);
          setEditingTask(null);
          setTaskInput('');
          setTaskTimeInput('');
        } else {
          onClose();
        }
      }
    };
    if (isVisible) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      if (isVisible) document.body.style.overflow = 'unset';
    };
  }, [isVisible, onClose, showTaskForm]);

  useEffect(() => {
    setShowTaskForm(false);
    setEditingTask(null);
    setTaskInput('');
    setTaskTimeInput('');
  }, [selectedDate, currentDate]);
  
  useEffect(() => {
    if (showTaskForm && taskInputRef.current) {
      taskInputRef.current.focus();
    }
  }, [showTaskForm]);


  const tasksForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = formatDateToYYYYMMDD(selectedDate);
    return tasks.filter(task => task.date === dateStr).sort((a,b) => (a.isCompleted === b.isCompleted) ? 0 : a.isCompleted ? 1 : -1);
  }, [tasks, selectedDate]);

  const handleDayHasTasks = useCallback((date: Date): boolean => {
    const dateStr = formatDateToYYYYMMDD(date);
    return tasks.some(task => task.date === dateStr && !task.isCompleted);
  }, [tasks]);

  const handleAddTaskClick = () => {
    if (!selectedDate || new Date(selectedDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0)) return;
    setEditingTask(null);
    setTaskInput('');
    setTaskTimeInput('09:00 AM');
    setShowTaskForm(true);
  };

  const handleEditTaskClick = (task: CalendarTask) => {
    setEditingTask(task);
    setTaskInput(task.title);
    setTaskTimeInput(task.time || '');
    setShowTaskForm(true);
  };

  const handleSaveTask = () => {
    if (!taskInput.trim() || !selectedDate) return;
    const dateStr = formatDateToYYYYMMDD(selectedDate);

    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, title: taskInput.trim(), time: taskTimeInput.trim() || undefined } : t));
    } else {
      const newTask: CalendarTask = {
        id: Date.now().toString(),
        date: dateStr,
        title: taskInput.trim(),
        time: taskTimeInput.trim() || undefined,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
    }
    setShowTaskForm(false);
    setEditingTask(null);
    setTaskInput('');
    setTaskTimeInput('');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    if (editingTask?.id === taskId) {
        setShowTaskForm(false);
        setEditingTask(null);
        setTaskInput('');
        setTaskTimeInput('');
    }
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const getDayCx = (day: CalendarDay) => {
    let cx = "relative flex items-center justify-center w-9 h-9 rounded-full text-xs transition-all duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 dark:focus:ring-offset-neutral-800 text-neutral-800 dark:text-neutral-200";

    if (day.isCurrentMonth) {
      if (day.isDisabled) {
        cx += " text-neutral-400/70 dark:text-neutral-500/70 cursor-not-allowed";
      } else {
        cx += " cursor-pointer focus:ring-primary dark:focus:ring-primary-light";
        if (day.isSelected) {
          if (day.isToday) { 
            cx += " bg-primary text-white dark:bg-primary-light dark:text-neutral-900 font-semibold";
          } else { 
            cx += " ring-2 ring-primary text-primary dark:ring-primary-light dark:text-primary-light font-semibold bg-transparent hover:bg-primary/10 dark:hover:bg-primary-light/10";
          }
        } else if (day.isToday) { 
          cx += " bg-primary text-white dark:bg-primary-light dark:text-neutral-900 font-semibold";
        } else { 
          cx += " hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50";
        }
      }
    } else { 
      cx += " text-neutral-400/70 dark:text-neutral-500/70 cursor-default";
    }
    return cx;
  };
  
  const isPastSelectedDate = selectedDate && new Date(selectedDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 dark:bg-black/70 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-widget-title"
      onClick={onClose}
    >
      <div
        ref={widgetRef}
        className="bg-white/60 dark:bg-neutral-800/50 backdrop-blur-lg rounded-3xl shadow-lg dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.4)] p-3 w-full max-w-[340px] mx-4 animate-ios-widget-modal-enter flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 id="calendar-widget-title" className="text-base font-bold text-neutral-800 dark:text-neutral-100">
            {monthName} {yearName}
          </h2>
          <div className="flex items-center space-x-1">
            <button onClick={navigateToPreviousMonth} aria-label="Previous month" className="p-1 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 focus-style"><ChevronLeftIcon /></button>
            <button onClick={navigateToNextMonth} aria-label="Next month" className="p-1 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/70 focus-style"><ChevronRightIcon /></button>
            <button onClick={onClose} aria-label="Close calendar" className="p-1 rounded-full text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus-style"><XMarkIconWidget /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
          {weekdayNames.map(name => (
            <div key={name} className="text-[0.7rem] font-medium text-neutral-500 dark:text-neutral-400 py-0.5">{name}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarGrid.map((day, index) => (
            <button
              key={index}
              className={getDayCx(day)}
              onClick={() => hookHandleSelectDate(day.date)}
              disabled={day.isDisabled && !day.isCurrentMonth} 
              aria-pressed={day.isSelected}
              aria-label={`${day.dayOfMonth} ${monthName} ${yearName}${day.isToday ? ', Today' : ''}${day.isSelected ? ', Selected' : ''}${day.isDisabled ? ', Past date' : ''}`}
            >
              {day.dayOfMonth}
              {handleDayHasTasks(day.date) && <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${(day.isSelected || day.isToday) && day.isCurrentMonth ? 'bg-white dark:bg-neutral-800' : 'bg-primary dark:bg-primary-light'}`}></span>}
            </button>
          ))}
        </div>

        <div className="mt-2.5 pt-2.5 border-t border-neutral-300/50 dark:border-neutral-600/50 flex-grow overflow-y-auto min-h-[90px]">
          {selectedDate && (
            <>
              <div className="flex justify-between items-center mb-1.5">
                <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                  Tasks for {selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </h3>
                {!showTaskForm && !isPastSelectedDate && (
                  <button
                    onClick={handleAddTaskClick}
                    className="flex items-center text-xs text-primary dark:text-primary-light hover:underline focus-style px-1 py-0.5 rounded"
                  >
                    <PlusIcon className="w-3.5 h-3.5 mr-0.5" /> Add Task
                  </button>
                )}
              </div>

              {showTaskForm ? (
                <div className="space-y-2 p-2 bg-neutral-100/50 dark:bg-neutral-700/40 rounded-lg">
                  <input
                    ref={taskInputRef}
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Task title"
                    className="w-full px-2 py-1.5 text-xs border border-neutral-300/70 dark:border-neutral-500/70 rounded-md focus:ring-primary-light focus:border-primary-light bg-neutral-100/90 dark:bg-neutral-700/80 text-neutral-800 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
                  />
                  <input
                    type="text"
                    value={taskTimeInput}
                    onChange={(e) => setTaskTimeInput(e.target.value)}
                    placeholder="Time (e.g., 09:00 AM)"
                    className="w-full px-2 py-1.5 text-xs border border-neutral-300/70 dark:border-neutral-500/70 rounded-md focus:ring-primary-light focus:border-primary-light bg-neutral-100/90 dark:bg-neutral-700/80 text-neutral-800 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
                  />
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => { setShowTaskForm(false); setEditingTask(null); }} className="px-2 py-1 text-xs text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-600/70 rounded-md focus-style">Cancel</button>
                    <button onClick={handleSaveTask} className="px-2 py-1 text-xs bg-primary text-white dark:bg-primary-light dark:text-neutral-900 hover:bg-primary-dark dark:hover:bg-primary rounded-md focus-style">Save</button>
                  </div>
                </div>
              ) : (
                tasksForSelectedDate.length > 0 ? (
                  <ul className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                    {tasksForSelectedDate.map(task => (
                      <li key={task.id} className={`flex items-center justify-between p-1.5 rounded-md group transition-colors duration-100 ${task.isCompleted ? 'bg-neutral-100/70 dark:bg-neutral-700/50' : 'hover:bg-neutral-100/50 dark:hover:bg-neutral-700/30'}`}>
                        <div className="flex items-center flex-grow overflow-hidden">
                          {!isPastSelectedDate && (
                            <input
                                type="checkbox"
                                checked={task.isCompleted}
                                onChange={() => handleToggleComplete(task.id)}
                                className="form-checkbox h-3.5 w-3.5 text-primary dark:text-primary-light bg-neutral-200/80 dark:bg-neutral-600/80 border-neutral-300/80 dark:border-neutral-500/80 rounded focus:ring-primary dark:focus:ring-primary-light focus:ring-offset-0 mr-2 cursor-pointer"
                                aria-label={`Mark task ${task.title} as ${task.isCompleted ? 'incomplete' : 'complete'}`}
                            />
                          )}
                          <div className="flex-grow overflow-hidden">
                            <span className={`text-xs block truncate ${task.isCompleted ? 'line-through text-neutral-500 dark:text-neutral-400' : 'text-neutral-700 dark:text-neutral-200'}`}>{task.title}</span>
                            {task.time && <span className={`text-[0.65rem] block truncate ${task.isCompleted ? 'text-neutral-400 dark:text-neutral-500' : 'text-neutral-500 dark:text-neutral-400'}`}>{task.time}</span>}
                          </div>
                        </div>
                        {!isPastSelectedDate && (
                            <div className="flex-shrink-0 flex items-center space-x-1 ml-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                            <button onClick={() => handleEditTaskClick(task)} aria-label={`Edit task ${task.title}`} className="p-1 text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary-light rounded focus-style"><PencilIcon className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDeleteTask(task.id)} aria-label={`Delete task ${task.title}`} className="p-1 text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 rounded focus-style"><TrashIcon className="w-3.5 h-3.5" /></button>
                            </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center py-3">
                    {isPastSelectedDate ? "No tasks recorded." : "No tasks for this day."}
                  </p>
                )
              )}
            </>
          )}
           {!selectedDate && (
             <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center py-3">
                Select a date to view tasks.
             </p>
           )}
        </div>
      </div>
      <style>{`
        .focus-style:focus {
            outline: none;
            box-shadow: 0 0 0 1.5px var(--color-primary-light); 
        }
        html.dark .focus-style:focus {
            box-shadow: 0 0 0 1.5px var(--color-primary);
        }
        .form-checkbox:checked {
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }
        .max-h-\\[120px\\]::-webkit-scrollbar {
            width: 4px;
        }
        .max-h-\\[120px\\]::-webkit-scrollbar-track {
            background: transparent;
        }
        .max-h-\\[120px\\]::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 8px;
        }
        html.dark .max-h-\\[120px\\]::-webkit-scrollbar-thumb {
            background: #4b5563; 
        }
        .max-h-\\[120px\\]::-webkit-scrollbar-thumb:hover {
            background: #9ca3af; 
        }
        html.dark .max-h-\\[120px\\]::-webkit-scrollbar-thumb:hover {
            background: #6b7280; 
        }
      `}</style>
    </div>
  );
};

const CalendarWidget = React.memo(CalendarWidgetComponent);
export default CalendarWidget;
