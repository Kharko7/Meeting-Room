import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Controller, useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';

import Input from "components/UI/input"
import Button from "components/UI/button"
import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "validators/auth";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import { userLogin, setError } from "redux&saga/slices/user.slice";
import { Navigate, useLocation } from "react-router-dom";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const location = useLocation()

  const { setAlert } = useContext(SnackBarContext)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { userRole, error, loading } = useAppSelector((state) => state.user);
  const pathFrom = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (error) {
      setAlert({
        severity: snackbarVariants.error,
        message: error,
      })
      dispatch(setError(''));
    }
  }, [dispatch, error, setAlert]);


  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
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
    reset()
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
          width: '400px',
          height: '400px',
          boxShadow: '-2px -2px 12px var(--base2), 2px 2px 8px var(--base3), 2px 2px 4px var(--base2)',
          borderRadius: '40px',
          padding: '40px 20px',

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
          //autoComplete="off"
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              disabled={loading}
              size='large'
              type='submit'>
              {loading ? <CircularProgress sx={{ color: '#7e7e82',margin: '0 21px' }} size={22} /> : 'Log in'}
            </Button>
          </Box>
        </Box>
      </Box >
    </Box>
  )
}

export default Login