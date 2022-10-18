import FullCalendar, { DateSelectArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import classNames from 'classnames/bind';
import styles from './calendar.module.scss'
import { INITIAL_EVENTS } from '../../configs/initial-events';
import ukLocale from '@fullcalendar/core/locales/uk';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { useState } from 'react'
import useBooking from '../../hooks/use-booking';
import BookingPopup from '../booking-popup/BookingPopup';

const cn = classNames.bind(styles);

const Calendar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<string | null>(localStorage.getItem('language'));

  setTimeout(() => {
    const calendar = document.getElementById('calendar') as HTMLElement;
    if (language === 'ua') {
      const button = calendar.querySelector('.fc-buttonUa-button') as HTMLButtonElement;

      button.classList.add('active')
    } else {
      const button = calendar.querySelector('.fc-buttonEn-button') as HTMLButtonElement;

      button.classList.add('active')
    }
  }, 0)

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const {
    data,
    errors,
    selectedDateInfo,
    handleChangeData,
    handleSubmit,
    setSelectedDate,
  } = useBooking({
    onSubmit: () => {
      try {
        const calendarApi = selectedDateInfo?.view?.calendar;
        if (calendarApi) {
          calendarApi.addEvent(data)
          calendarApi.unselect()
        }
        setOpenModal(false)
      } catch (e) {
      }
    },
  })

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo)
    setOpenModal(true)
  }

  return (
    <div id='calendar' className={cn('demo-app-main')}  >
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
              localStorage.setItem('language', 'en');
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
              localStorage.setItem('language', 'ua');
            }
          }
        }
        }
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
        eventBorderColor='Silver'
        eventBackgroundColor='Silver'
        eventOverlap={false}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', meridiem: false }}
        allDaySlot={false}
        editable={true}
        dayMaxEvents={true}
        events={INITIAL_EVENTS}
        select={handleDateSelect}
      />
      <BookingPopup
        open={openModal}
        data={data}
        errors={errors}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
        handleChangeData={handleChangeData}
      />
    </div>
  )
}

export default Calendar


