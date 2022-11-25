import FullCalendar, { DateSelectArg, DatesSetArg, EventClickArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import './calendar.module.scss'
import ukLocale from '@fullcalendar/core/locales/uk';
import enLocale from '@fullcalendar/core/locales/en-gb';
import React, { useEffect, useState } from 'react'
import { setActiveClass } from '../../utils/set-active-class';
import { Box } from '@mui/material';
import { getFromLocalStorage, setToLocalStorage } from 'services/local-storage.service';
import { BookingEvent } from 'interfaces/booking/Booking';
import CircularProgress from '@mui/material/CircularProgress';

interface CalendarProps {
  data: BookingEvent[];
  calendarRef: React.MutableRefObject<FullCalendar | null>;
  weekends: boolean;
  loading: boolean;
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventSelect: (eventInfo: EventClickArg) => void;
  handleGetDate: (dateInfo: DatesSetArg) => void;
}
export default React.memo(function Calendar({ data, calendarRef, weekends, loading, handleDateSelect, handleEventSelect, handleGetDate }: CalendarProps) {
  const [language, setLanguage] = useState<string>(getFromLocalStorage('language'));

  useEffect(() => {
    setActiveClass(language);
  }, [language]);

  return (
    <Box
      id='calendar'
      sx={{
        height: 'calc(100% - 81px)',
        flexGrow: '1',
        position: 'relative',
        '& .fc-view-harness': { opacity: loading ? '0.2' : '1' }
      }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        customButtons={{
          buttonEn: {
            text: 'EN',
            click: (htmlElement) => {
              const el: any = htmlElement.target;
              const siblingEl = el.nextSibling;

              el.classList.add('active');
              siblingEl.classList.remove("active");
              setLanguage('en');
              setToLocalStorage('language', 'en');
            }
          },
          buttonUa: {
            text: 'UA',
            click: (htmlElement) => {
              const el: any = htmlElement.target;
              const siblingEl = el.previousSibling;

              el.classList.add('active');
              siblingEl.classList.remove("active");
              setLanguage('ua');
              setToLocalStorage('language', 'ua');
            }
          }
        }}
        headerToolbar={{
          left: 'prev next today',
          center: 'title',
          right: 'dayGridMonth timeGridWeek timeGridDay listWeek buttonEn,buttonUa'
        }}
        initialView='dayGridMonth'
        buttonText={{ list: language === 'ua' ? 'Список' : 'list' }}
        height='100%'
        titleFormat={{ year: 'numeric', month: '2-digit', day: '2-digit' }}
        locale={language === 'ua' ? ukLocale : enLocale}
        selectMirror={true}
        selectable={true}
        navLinks={true}
        eventDisplay='list-item'
        eventBorderColor='var(--accent-color)'
        eventBackgroundColor='var(--accent-color)'
        eventOverlap={false}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', meridiem: false }}
        allDaySlot={false}
        defaultAllDay={false}
        editable={false}
        dayMaxEvents={true}
        snapDuration='00:15:00'
        events={data}
        weekends={weekends}
        selectOverlap={false}
        select={handleDateSelect}
        eventClick={handleEventSelect}
        datesSet={handleGetDate}
        ref={calendarRef}
        weekNumbers={true}
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '10%', left: '0%',
        fontSize: '40px',
        zIndex: loading ? '3' : '-1000',
        width: '100%',
        height: 'calc(100% - 10%)',
      }}>
        <CircularProgress size={100} />
      </Box>
    </Box>
  );
});


