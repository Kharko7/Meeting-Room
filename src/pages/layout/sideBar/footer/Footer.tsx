import { Box, SvgIconTypeMap, } from "@mui/material"
import { Home, CalendarMonth, LocationOn } from '@mui/icons-material';
import { OverridableComponent } from "@mui/material/OverridableComponent";

import IconButtonMUI from "components/UI/icon-button/IconButtonMUI";


interface Pages {
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const pages: Pages[] = [
  { route: '/room', icon: Home },
  { route: '/calendar', icon: CalendarMonth },
  { route: '/map', icon: LocationOn },
]

const Footer = () => {

  const iconButtons = pages.map((page) => (
    <IconButtonMUI
      key={page.route}
      sx={{
        borderRadius: '14px',
        '&:active': {
          boxShadow: 'var(--inset-input-shadow)',
          color: 'var(--accent-text-color)'
        },
        '&.active': {
          boxShadow: 'var(--inset-input-shadow)',
          color: 'var(--accent-text-color)'
        }
      }}
      to={page.route}
      icon={<page.icon fontSize='large' />}
    />
  ))


  return (
    <Box
      sx={{
        boxShadow: 'var(--outset-box-shadow)',
        backgroundColor: 'var(--calendar-bg)',
        borderRadius: ' 15px',
        height: 'Calc(8% - 10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      {iconButtons}
    </Box>
  )
}

export default Footer