import { Box } from '@mui/material';
import { ChangePasswordComponent } from 'components';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Typography from '@mui/material/Typography'
import ProfileForm from 'components/profile-form';

const Profile = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const goBack = () => navigate(-1)
  const from = location.state?.from?.pathname;

  const checkPath = (from: string) => {
    if (from === '/calendar') {
      return 'to calendar'
    }
    if (from === '/rooms') {
      return 'to rooms'
    }
    return ''
  }

  return (
    <Box sx={{ height: '100%',paddingBottom:'40px' }}>
      <Box sx={{ display: 'flex', ml: '80px', pt: '40px' }}>
        <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {from && <KeyboardBackspaceIcon fontSize='large' sx={{ color: 'var(--accent-text-color)' }} />}
          <Typography
            component='span'
            variant='h4'
            onClick={goBack}
            sx={{ color: 'var(--accent-text-color)' }}
          >  {from && `Go back ${checkPath(from)}`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',  flexDirection:"column"}}>
          <ProfileForm/>
          <ChangePasswordComponent/>
      </Box>
    </Box>
  )
}

export default Profile