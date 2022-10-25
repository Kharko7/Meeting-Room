import { Box } from '@mui/material'
import SideBar from 'pages/layout/sideBar';
import { Outlet } from 'react-router-dom';

const AppMain: React.FunctionComponent = () => {

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <Outlet />
      </Box>
      <Box sx={{ flex: '0 1 20%' }}>
        <SideBar userName={"Some Guy"} />
      </Box>
    </Box>
  )
}

export default AppMain
