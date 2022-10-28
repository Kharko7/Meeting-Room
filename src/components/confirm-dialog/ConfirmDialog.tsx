import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'components/button';

interface ConfirmDialogProps {
  open: boolean;
  message: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, message, onDismiss, onConfirm }: ConfirmDialogProps) => {

  const boxShadow = '2px 2px 20px 1px rgb(69 69 69 / 70%), -5px -5px 16px -4px rgb(255 255 255)'

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paper': { boxShadow: boxShadow } }}
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
          <Button size='small' onclick={onConfirm}>Yes</Button>
          <Button size='small' onclick={onDismiss}> No </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmDialog