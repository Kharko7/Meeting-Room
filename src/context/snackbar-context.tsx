import { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { snackbarVariants } from '../constants/snackbar';

type SnackBarContextProviderProps = {
  children: React.ReactNode
};
interface optionsParameter {
  severity: snackbarVariants;
  message: string;
}
type SnackBarContextProps = {
  setAlert: (options: optionsParameter) => void
}

export const SnackBarContext = createContext<SnackBarContextProps>({ setAlert(): void { } });

export const SnackBarContextProvider = ({ children }: SnackBarContextProviderProps) => {
  const [show, setShow] = useState<boolean>(false)
  const [snackBarState, setSnackBarState] = useState<optionsParameter>({ severity: snackbarVariants.error, message: '' })

  const setAlert = ((options: optionsParameter) => {
    setShow(true)
    setSnackBarState({ severity: options.severity, message: options.message })
  })
  const handleClose = () => {
    setShow(false)
  }

  return (
    <SnackBarContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={handleClose}
        open={show}
      >
        <Alert variant="filled" severity={snackBarState?.severity}>
          {snackBarState?.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  )
};