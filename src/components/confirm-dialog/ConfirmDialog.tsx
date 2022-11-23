import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "../../components/button";

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, message, onDismiss, onConfirm }: ConfirmDialogProps) => {
  const style = {
    width: '500px',
    height: '220px',
    borderRadius: '20px',
    backgroundColor: 'var(--primary-color)',
    '& h2': {
      fontSize: '22px',
      letterSpacing: '0.9px',
      color: 'var(--accent-text-color)',
    },
    '& p': {
      fontSize: '20px',
      color: 'var(--mainColorFont)',
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'space-between',
    },
    '& .MuiDialogContent-root': {
      display: 'flex',
      alignItems: 'center',
      borderTopColor: 'var(--accent-text-color)',
      borderBottomColor: 'var(--accent-text-color)',
    },
  }

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paper': style }}
        open={open}
        onClose={onDismiss}
      >
        <DialogTitle sx={{ fontWeight: '600' }} >
          Confirmation
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText sx={{ color: 'black' }} >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: '20px' }}>
          <Button styleType='error' onclick={onConfirm}>Yes</Button>
          <Button onclick={onDismiss}> No </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmDialog