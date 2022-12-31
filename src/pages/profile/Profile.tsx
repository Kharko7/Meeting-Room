import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useContext, useEffect } from 'react';

import ChangePassword from './change-password/ChangePassword';
import { useAppDispatch, useAppSelector } from 'hooks/use-toolkit-hooks';
import { setNotification } from 'redux/slices/user.slice';
import { SnackBarContext } from 'context/snackbar-context';
import ProfileForm from './profile-form';

const checkPath = (from: string) => {
  if (from === '/calendar') {
    return 'to calendar'
  }
  if (from === '/rooms') {
    return 'to rooms'
  }
  return ''
}

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation()
  const { setAlert } = useContext(SnackBarContext)
  const { userEmail, notification, loading } = useAppSelector((state) => state.user);
  const from = location.state?.from?.pathname || '/';

  const goBack = () => navigate(from)

  useEffect(() => {
    if (notification.message) {
      setAlert({
        severity: notification.status,
        message: notification.message,
      })
      dispatch(setNotification({ message: '' }));
    }
  }, [dispatch, notification, setAlert]);

  return (
    <Box sx={{ height: '100%', paddingBottom: '40px' }}>
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
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
      }}>
        <ProfileForm />
        <ChangePassword email={userEmail} loading={loading} />
      </Box>
    </Box>
  )
}

export default Profile