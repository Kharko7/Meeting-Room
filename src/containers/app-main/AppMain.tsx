import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';

import SideBar from 'pages/layout/sideBar';

const AppMain: React.FunctionComponent = () => {

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <Outlet />
      </Box>
      <Box sx={{
        flex: '0 0 20%',
        overflow: 'hidden',
      }}>
        <SideBar />
      </Box>
    </Box>
  )
}

export default AppMain
