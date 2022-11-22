import React, { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { axiosService } from 'services/axios.service/axios.service';
import { useAppDispatch } from 'hooks/toolkitHooks';
import { setInvite } from 'redux&saga/slices/booking.slice';
import { SnackBarContext } from 'context/snackbar-context';
import { snackbarVariants } from 'constants/snackbar';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userId: number;
};

const InviteCoworkers = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const loading = open && users.length === 0;
  const { setAlert } = useContext(SnackBarContext)

  useEffect(() => {
    if (!loading) {
      return
    };

    axiosService.get('users')
      .then((response) => {
        setUsers(response.data)
      }).catch((error) => {
        setOpen(false)
        setAlert({
          severity: snackbarVariants.error,
          message: error.message
        })
      })
  }, [loading, setAlert]);

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
      options={users}
      loading={loading}
      onChange={(_, value) => dispatch(setInvite(value.map(users => users.userId)))}
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