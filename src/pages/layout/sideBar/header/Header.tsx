import { Box, Typography } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from "react-router-dom";

import { useAppSelector } from "hooks/use-toolkit-hooks";
import IconButtonMUI from "components/UI/icon-button/IconButtonMUI";
import UserIcon from 'assets/User.png'
import { URL_IMG } from "constants/constant";


const Header = () => {
  const location = useLocation();
  const { firstName, lastName, userImg } = useAppSelector((state) => state.user);

  return (
    <Box
      sx={{
        height: '100px',
        borderBottom: '3px var(--accent-text-color) solid',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '5px',
        }}>
        <Box
          component={'img'}
          alt='User'
          src={userImg ? URL_IMG + userImg : UserIcon}
          sx={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            boxShadow: 'var(--datePicker-box-shadow)',
            mr: '10px',
          }}
        >
        </Box>
        <IconButtonMUI
          sx={{
            borderRadius: '10px',
            width: '35px',
            height: '35px',
          }}
          to="/profile"
          state={{ from: location }}
          icon={<SettingsIcon />}
        />
      </Box>
      <Box
        sx={{
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h6'
          sx={{
            color: 'var(--accent-text-color)',
            lineHeight: 'normal'
          }}
        >   {firstName + ' ' + lastName}
        </Typography>
      </Box>
    </Box >
  )
}

export default Header