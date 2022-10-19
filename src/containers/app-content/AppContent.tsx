import classNames from 'classnames/bind';
import AppMain from '../app-main/AppMain';
import styles from './appContent.module.scss'
import { Box } from '@mui/material'
import SideBar from 'pages/layout/sideBar';

const cx = classNames.bind(styles);

const AppContent: React.FunctionComponent = () => {

  return (
    <Box className={cx('content')}>
      <AppMain />
      <Box sx={{flex: '0 1 340px'}}>
        <SideBar userName='Roman Borovets' />
      </Box>
    </Box>
  )
}

export default AppContent
