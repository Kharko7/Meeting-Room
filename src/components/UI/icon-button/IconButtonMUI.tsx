import { IconButton } from "@mui/material"
import { SxProps } from '@mui/material/styles';
import { Location, NavLink } from "react-router-dom"

interface IconButtonProps {
  to: string;
  icon: React.ReactNode;
  sx?: SxProps;
  state?: Record<string, Location>;
}

const IconButtonMUI = ({ icon, sx = {}, to, state = {} }: IconButtonProps) => {
  return (
    <IconButton
      disableRipple
      sx={{
        width: '50px',
        height: '50px',
        boxShadow: 'var(--datePicker-box-shadow)',
        '&:active': {
          boxShadow: 'var(--inset-input-shadow)',
        },
        ...sx
      }}
      component={NavLink}
      to={to}
      state={state}
    >
      {icon}
    </IconButton>
  )
}

export default IconButtonMUI