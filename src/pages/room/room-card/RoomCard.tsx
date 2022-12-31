import { Box, Typography } from "@mui/material"
import MeetingRoom from 'assets/Meeting-room.jpg'
import ButtonMI from "components/UI/button/Button"

interface RoomCardProps {
  title: string;
  roomId: number;
  floor: number;
  capacity: number;
  onClick: (id: number) => void;
}

const RoomCard = ({ title, roomId, floor, capacity, onClick }: RoomCardProps) => {
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
        }}
      >
        <Typography
          component='span'
          variant="h6"
          sx={{
            mb: "20px",
            textAlign: "center",
            color: "var(--accent-text-color)",
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Typography>
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