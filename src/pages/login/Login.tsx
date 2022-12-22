import { Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Navigate, useLocation } from "react-router-dom";

import Input from "components/UI/input"
import Button from "components/UI/button"
import { useContext, useEffect } from "react";
import { LoginSchema } from "validators/auth";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import { userLogin, setNotification } from "redux&saga/slices/user.slice";
import { SnackBarContext } from "context/snackbar-context";
import useVisibilityInput from "hooks/use-visibility-input";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const location = useLocation()

  const { setAlert } = useContext(SnackBarContext)
  const { userRole, notification, loading } = useAppSelector((state) => state.user);
  const { inputAdornment: passwordVisibility, showText: showPassword } = useVisibilityInput()
  const pathFrom = location.state?.from?.pathname || '/';

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
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const submit = (data: any) => {
    dispatch(userLogin(data))
  }

  if (userRole) {
    return <Navigate to={pathFrom} replace={true} />
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          minWidth: '450px',
          minHeight: '400px',
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
        > Log in
        </Typography>
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
          <Box sx={{ mb: "25px", height: "75px" }}>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  error={Boolean(errors.password)}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  data-testid="input-password"
                  fullWidth
                  helperText={errors.password?.message}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  InputProps={passwordVisibility}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '25px' }}>
            <Button
              disabled={loading}
              size='large'
              type='submit'>
              {loading ? <CircularProgress sx={{ color: '#7e7e82', margin: '0 21px' }} size={22} /> : 'Log in'}
            </Button>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'end' }}>
          <Box
            component={Link}
            to="/resetPassword"
            sx={{ color: 'var(--accent-text-color)', '&:hover': { textDecoration: 'underline' } }}
          >
            Forgot password?
          </Box>
        </Box>
      </Box >
    </Box>
  )
}

export default Login