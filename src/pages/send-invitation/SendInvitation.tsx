import { Box, Typography } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect } from "react";

import Input from "components/UI/input"
import Button from "components/UI/button"
import { InviteUsersSchema } from "validators/auth";
import { useAppDispatch, useAppSelector } from "hooks/use-toolkit-hooks";
import { setNotification, inviteUsers } from "redux&saga/slices/user.slice";
import { SnackBarContext } from "context/snackbar-context";
import { Link, Navigate } from "react-router-dom";

interface FormValues {
  emails: { email: string }[];
}

const SendInvitation = () => {
  const dispatch = useAppDispatch();

  const { setAlert } = useContext(SnackBarContext)
  const { userRole, notification, loading } = useAppSelector((state) => state.user);

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
    resolver: yupResolver(InviteUsersSchema),
    defaultValues: {
      emails: [{ email: "", }]
    }
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray<FormValues, 'emails', 'emailId'>({
    control,
    name: "emails",
    keyName: 'emailId',
  });

  const submit = (data: FormValues) => {
    dispatch(inviteUsers(data.emails))
  }

  if (userRole !== "admin") {
    return <Navigate to={'/profile'} replace={true} />
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
          boxShadow: '-2px -2px 12px var(--base2), 2px 2px 8px var(--base3), 2px 2px 4px var(--base2)',
          borderRadius: '40px',
          padding: '40px 30px',
        }}>
        <Typography
          variant='h5'
          sx={{
            color: 'var(--accent-text-color)',
            textAlign: 'center',
            mb: '20px'
          }}
        >Enter the email(s) that will receive the invitation
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(submit)}
        >
          <Box
            component='ul'
            sx={{ maxHeight: '580px', overflow: 'auto', p: '20px 8px 0 0' }}>
            {fields.map((item, index) => (
              <Box
                key={item.emailId}
                component='li'
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  mb: "25px",
                  height: "85px",

                }}>
                <Controller
                  name={`emails.${index}.email`}
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      error={Boolean(errors.emails?.[index]?.email)}
                      label="Email"
                      fullWidth
                      helperText={errors.emails?.[index]?.email?.message}
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  )}
                />
                <Button
                  disabled={index === 0 ? true : false}
                  onClick={() => remove(index)}
                  size='medium'
                  sx={{ ml: '10px' }}
                >
                  Delete
                </Button>
              </Box>
            ))}
          </Box>
          <Button
            size='large'
            onClick={() => append({ email: "" })}
          >
            Add
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: '25px' }}>
            <Button
              disabled={loading}
              size='large'
              type='submit'>
              {loading
                ? <CircularProgress sx={{ color: '#7e7e82', margin: '0 21px' }} size={22} />
                : 'Invite'}
            </Button>

          </Box>
          <Box
            component={Link}
            to="/profile"
            sx={{ color: 'var(--accent-text-color)', '&:hover': { textDecoration: 'underline' } }}
          >
            Go back to settings
          </Box>
        </Box>
      </Box >
    </Box >
  )
}

export default SendInvitation