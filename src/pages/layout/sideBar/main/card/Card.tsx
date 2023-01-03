import { Box, Typography } from "@mui/material"
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import dayjs from "dayjs";

interface CardProps {
  title: string;
  start: string;
  end: string;
}

const Card = ({ title, start, end }: CardProps) => {

  const startHour = dayjs(start).format('HH:mm');
  const startDate = dayjs(start).format('DD MMMM YYYY');
  const endHour = dayjs(end).format('HH:mm');
  const endDate = dayjs(end).format('DD MMMM YYYY');

  return (
    <Box
      sx={{
        minHeight: '110px',
        boxShadow: 'var(--outset-box-shadow)',
        backgroundColor: 'var(--primary-color)',
        borderRadius: '10px',
        p: '10px',
        color: 'var(--accent-text-color)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <Typography
        component='span'
        variant='subtitle1'
        sx={{
          color: 'var(--accent-text-color)',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          m: '5px 0',
        }}
      >
        <HourglassTopIcon sx={{ mr: '5px' }} fontSize="small" />
        <Typography
          component='span'
          variant='subtitle2'
          sx={{
            color: 'var(--primary-text-color)',
          }}
        >
          {startHour + ' | ' + startDate}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          m: '5px 0',
        }}
      >
        <HourglassBottomIcon sx={{ mr: '5px' }} fontSize="small" />
        <Typography
          component='span'
          variant='subtitle2'
          sx={{
            color: 'var(--primary-text-color)',
          }}
        >
          {endHour + ' | ' + endDate}
        </Typography>
      </Box>
    </Box >
  )
}

export default Card