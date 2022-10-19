import Calendar from '../../components/calendar/Calendar';
import { Box } from '@mui/material';
import SideBar from "../layout/sideBar";

import classNames from 'classnames/bind';
import styles from './calendarPage.module.scss'
const cn = classNames.bind(styles)


const CalendarPage = () => {

  return (
      <div className={cn("calendar_container")}><Box sx={{display: 'flex', height: '100%'}}>
          <Calendar/>
          {/*<SideBar userName={"Some Guy"}/>*/}
      </Box></div>
  )
}

export default CalendarPage