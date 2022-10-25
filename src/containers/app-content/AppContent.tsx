import { Box } from '@mui/material'
import AppRouter from 'routes/routes';

const AppContent: React.FunctionComponent = () => {

  return (
    <Box sx={{height: '100vh'}}>
      <AppRouter/>
    </Box>
  )
}

export default AppContent
