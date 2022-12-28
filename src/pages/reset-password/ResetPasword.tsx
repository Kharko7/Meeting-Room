import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import Input from "components/UI/input"
import Button from "components/UI/button"
import { useContext, useEffect } from "react";
import { EmailSchema } from "validators/auth";
import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks";
import { setNotification, recoveryPassword } from "redux/slices/user.slice";
import { SnackBarContext } from "context/snackbar-context";
import { enterEmail, success, successInstructions } from "constants/constant";

interface FormValues {
  email: string;
}

const ResetPasword = () => {
  const dispatch = useAppDispatch();

  const { setAlert } = useContext(SnackBarContext)
  const { userRecovered, notification, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (notification.message) {
      setAlert({
        severity: notification.status,
        message: notification.message,
      })
      dispatch(setNotification({ message: '' }));
    }
  }, [dispatch, notification, setAlert]);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(EmailSchema),
    defaultValues: {
      email: '',
    }
  });

  const submit = (data: FormValues) => {
    //dispatch(recoveryPassword(data))
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          boxShadow: '-2px -2px 12px var(--base2), 2px 2px 8px var(--base3), 2px 2px 4px var(--base2)',
          borderRadius: '40px',
          padding: '40px 30px',
        }}>
        <Typography
          variant='h4'
          sx={{
            color: 'var(--accent-text-color)',
            textAlign: 'center',
            mb: '20px'
          }}
        >{userRecovered ? success : 'Recovery password'}
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{
            textAlign: 'center',
            mb: '40px'
          }}
        > {userRecovered ? successInstructions : enterEmail}
        </Typography>
        {!userRecovered
          ? (
            <Box
              component='form'
              onSubmit={handleSubmit(submit)}
            >
              <Box sx={{ mb: "25px", height: "75px" }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      error={Boolean(errors.email)}
                      autoFocus
                      label="Email"
                      data-testid="input-email"
                      fullWidth
                      helperText={errors.email?.message}
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: '25px' }}>
                <Button
                  disabled={loading}
                  size='large'
                  type='submit'>
                  {loading
                    ? <CircularProgress sx={{ color: '#7e7e82', margin: '0 21px' }} size={22} />
                    : 'Send'}
                </Button>
              </Box>
            </Box>
          ) : null}
        <Box
          component={Link}
          to="/login"
          sx={{
            color: 'var(--accent-text-color)',
            '&:hover': { textDecoration: 'underline' }
          }}
        >Go back to Log in?</Box>
      </Box >
    </Box>
  )
}

export default ResetPasword