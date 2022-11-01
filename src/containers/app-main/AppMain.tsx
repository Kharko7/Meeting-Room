import { Box } from '@mui/material'
import SideBar from '../../pages/layout/sideBar/SideBar';
import { Outlet } from 'react-router-dom';

const AppMain: React.FunctionComponent = () => {

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <Outlet />
      </Box>
      <Box sx={{ flex: '0 0 20%' }}>
        <SideBar userName={"Some Guy"} />
      </Box>
    </Box>
  )
}

export default AppMain
