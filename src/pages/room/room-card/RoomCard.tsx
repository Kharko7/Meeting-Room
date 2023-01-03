import { Box, Typography } from "@mui/material"
import { Groups } from '@mui/icons-material';

import MeetingRoom from 'assets/Meeting-room.jpg'
import ButtonMI from "components/UI/button/Button"
import { Devices } from "interfaces/Rooms";
import { showDevices } from "utils/show-devices";

interface RoomCardProps {
  title: string;
  roomId: number;
  capacity: number;
  devices: Devices[];
  onClick: (id: number) => void;
}

const RoomCard = ({ title, roomId, capacity, devices, onClick }: RoomCardProps) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--outset-box-shadow)',
        backgroundColor: 'var(--base1)',
        width: '400px',
        height: '400px',
        p: '20px',
        borderRadius: '10px',
      }}
    >
      <Box
        component='img'
        alt='Photo'
        src={MeetingRoom}
        sx={{
          width: '100%',
          height: '200px',
          boxShadow: 'var(--inset-input-shadow);',
          mr: '10px',
          p: '5px',
        }}
      >
      </Box>
      <Box
        sx={{
          m: '10px 0',
          flexGrow: 1,
          p: '0 7px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: "20px",

          }}
        >
          <Typography
            component='span'
            variant="h6"
            sx={{
              textAlign: "center",
              color: "var(--accent-text-color)",
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              component='span'
              sx={{
                fontSize: '18px',
                fontWeight: '500',
                color: 'rgba(0, 0, 0, 0.54)',
                lineHeight: '1.9'
              }}
            >
              {capacity}
            </Typography>
            <Groups sx={{
              color: 'rgba(0, 0, 0, 0.54)',
              ml: '10px',
              fontSize: '30px'
            }} />
          </Box>
        </Box>
        {showDevices(devices)}
      </Box>
      <Box
        sx={{
          textAlign: 'center'
        }}>

        <ButtonMI
          onClick={() => onClick(roomId)}
          size='large'
        >
          Reserve a Rooms
        </ButtonMI>
      </Box>
    </Box>

  )
}

export default RoomCard