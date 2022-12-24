import { Dialog, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

interface ModalPopupProps {
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
}

const ModalPopup = ({ open, children, onClose, }: ModalPopupProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: ' var(--blur)',
        },
        '& .MuiPaper-root': {
          backgroundColor: 'var(--base1)',
          borderRadius: '20px',
          boxShadow: 'var(--outset-box-shadow)',
          maxWidth: 'initial',
          p: '15px'
        }
      }}
    >
      <Box >
        <Box sx={{ textAlign: 'end' }} >
          <IconButton
            disableRipple
            onClick={onClose}
            sx={{
              width: "35px",
              height: '35px',
              padding: '13px',
              boxShadow: 'var(--outset-box-shadow)',
              borderRadius: '7px',
              '&:active': {
                backgroundColor: 'var(--primary-color)',
                boxShadow: 'var(--inset-input-shadow)',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Dialog >
  )
}

export default ModalPopup