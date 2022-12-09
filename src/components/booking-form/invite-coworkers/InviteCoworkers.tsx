import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosService } from 'services/axios.service/axios.service';
import { SnackBarContext } from 'context/snackbar-context';
import { snackbarVariants } from 'constants/snackbar';
import { styles } from 'components/selector-floor-and-room/selector-styles';
import { Paper } from '@material-ui/core';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userId: number;
};
interface InviteCoworkersProps {
  edit: boolean;
  value: number[];
  onChange: (value: number[]) => void;
};

const InviteCoworkers = ({ edit, value, onChange }: InviteCoworkersProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [editBooking, setEditBooking] = useState<boolean>(edit);
  const { setAlert } = useContext(SnackBarContext)

  const loading = value.length ? (editBooking && users.length === 0) || (open && users.length === 0) : open && users.length === 0
  useEffect(() => {
    if (!loading) {
      return
    };

    axiosService.get('users')
      .then((response) => {
        setUsers(response.data)
      }).catch((error) => {
        setEditBooking(false)
        setOpen(false)
        setAlert({
          severity: snackbarVariants.error,
          message: error.message
        })
      })
  }, [loading, setAlert]);

  const handleChange = (_: React.SyntheticEvent<Element, Event>, value: User[]) => {
    const coworkersId = value.map((users) => users.userId)
    onChange(coworkersId)
  }

  const usersName = editBooking ? users.filter((user) => value.includes(user.userId)) : undefined

  return (
    <Autocomplete
      data-testid='invite-coworkers'
      fullWidth
      multiple
      disableClearable
      disableCloseOnSelect
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
      value={usersName}
      options={users}
      loading={loading}
      PaperComponent={({ children }) => (
        <Paper style={styles.paper}>{children}</Paper>
      )}
      sx={{
        '& .MuiInputBase-input ': { pl: '15px!Important' },
      }}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          sx={{
            height: '102px',
            flexDirection: 'row',
            "& .MuiOutlinedInput-notchedOutline": { boxShadow: 'none', border: 'none' },
            "& .MuiAutocomplete-popupIndicator": { display: 'none' },
            "& div.MuiAutocomplete-inputRoot": {
              pr: '10px',
              overflow: 'auto',
              boxShadow: 'var(--inset-input-shadow)',
              border: '0px solid var(--PickerGlobalColor)',
              borderRadius: "25px"
            },
            '& .MuiChip-label': {
              color: 'var(--mainColorFont)'
            }
          }}
          {...params}
          label="Invite coworkers"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress sx={{ position: 'absolute', right: '45px', top: 'calc(50% - 14px)' }} color="inherit" size={30} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default InviteCoworkers;