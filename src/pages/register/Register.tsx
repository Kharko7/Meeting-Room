import { Box, Typography } from "@mui/material";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks";
import { setNotification, userSignup } from "redux/slices/user.slice";
import { SnackBarContext } from "context/snackbar-context";
import { snackbarVariants } from "constants/snackbar";
import { regExp } from "constants/regExp";
import { RegisterInterface } from "interfaces/User";
import RegisterForm from "./register-form/RegisterForm";

interface FormValues {
  firstName: string;
  lastName: string;
  confirmPassword?: string;
  password: string;
  email?: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { setAlert } = useContext(SnackBarContext)
  const { notification, loading } = useAppSelector((state) => state.user);

  const email = params.email || ''

  useEffect(() => {
    if (notification.message) {
      setAlert({
        severity: notification.status,
        message: notification.message,
      })
      dispatch(setNotification({ message: '' }));

      notification.status === 'success' && navigate('/login', { replace: true });
    }
  }, [dispatch, notification, setAlert, navigate]);


  const submit = (data: FormValues) => {
    data.email = email
    delete data.confirmPassword

    dispatch(userSignup(data as RegisterInterface))
  }

  if (!regExp.incoraEmail.test(email)) {
    setAlert({
      severity: snackbarVariants.error,
      message: 'Wrong registration link',
    })

    return <Navigate to={'/login'} replace={true} />
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
          width: '535px',
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
        > Registration
        </Typography>
        <RegisterForm loading={loading} onSubmit={submit} />
        <Box
          component={Link}
          to="/login"
          sx={{ color: 'var(--accent-text-color)', '&:hover': { textDecoration: 'underline' } }}
        >
          Log in?
        </Box>
      </Box >
    </Box>
  )
}

export default Register