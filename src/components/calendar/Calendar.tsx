import FullCalendar, { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react'
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

interface CalendarProps {
  data: EventInput[];
  weekends: boolean;
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventSelect: (eventInfo: EventClickArg) => void;
}
export default React.memo(function Calendar({ data, weekends, handleDateSelect, handleEventSelect }: CalendarProps) {
  const [language, setLanguage] = useState<string>(getFromLocalStorage('language'));

  useEffect(() => {
    setActiveClass(language);
  }, [language]);

  return (
    <Box sx={{ p: '10px 14px 14px 7px', flexGrow: '1' }} id='calendar'>
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
        select={handleDateSelect}
        eventClick={handleEventSelect}
      />
    </Box>
  );
});


