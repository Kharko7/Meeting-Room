import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import BookingFormAdd from '../booking-form-add/BookingFormAdd';

interface BookingPopupProps {
  open: boolean;
  data: any;
  errors: any;
  onClose: () => void;
  handleSubmit: (event: any) => void;
  handleChangeData: (key: string) => any;
}

const BookingPopup = ({ open, data, errors, onClose, handleSubmit, handleChangeData }: BookingPopupProps) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <Box>
        <Box sx={{ height: '50px', backgroundColor: '#bdc2d9' }} >
          <IconButton
            onClick={onClose}
            sx={{
              color: '#000',
              position: 'absolute',
              right: '0',
              padding: '13px',
              borderRadius: '5px',
            }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <BookingFormAdd
          data={data}
          errors={errors}
          handleSubmit={handleSubmit}
          handleChangeData={handleChangeData}
        />
      </Box>
    </Dialog>
  );
}

export default BookingPopup