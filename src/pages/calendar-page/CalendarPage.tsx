import classNames from 'classnames/bind';
import styles from './calendarPage.module.scss'
import Calendar from '../../components/calendar/Calendar';

const cn = classNames.bind(styles);

const CalendarPage = () => {
  return (
    <div className={cn('wrapper')}>
      <Calendar />
    </div>
  )
}

export default CalendarPage