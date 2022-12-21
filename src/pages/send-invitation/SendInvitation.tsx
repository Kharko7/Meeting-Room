import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CircularProgress } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";

import Input from "components/UI/input"
import Button from "components/UI/button"
import { EmailSchema } from "validators/auth";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import { setNotification, recoveryPassword, inviteUsers } from "redux&saga/slices/user.slice";
import { SnackBarContext } from "context/snackbar-context";

interface FormValues {
  '1': string;
}


const SendInvitation = () => {
  const dispatch = useAppDispatch();

  const { setAlert } = useContext(SnackBarContext)
  const { notification, loading } = useAppSelector((state) => state.user);

  const [inputs, setInputs] = useState<string[]>(['1', '2'])

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
    setValue,
    control,
    formState: { errors }
  } = useForm<any>({
    mode: 'onBlur',
    //resolver: yupResolver(EmailSchema),
    // defaultValues: {
    //   '1': '',
    // }
  });


  const handleDeleteInput = (input: string) => {
    const newInputs = inputs.filter((i) => i !== input)
    setInputs(newInputs)
    console.log(input)
    setValue(input, '')

  }

  const handleAddInput = () => {
    const number = String(+inputs[inputs.length - 1] + 1)
    console.log(number)
    setInputs(prev => [...prev, number])
  }

  console.log(inputs)
  const submit = (data: any) => {
    const newData = Object.values(data).map((email) => ({ 'email': email }))
    //const eee = newData.map((email) => ({ 'email': email }))
    console.log(newData)
    dispatch(inviteUsers(newData))
    console.log(data)
  }

  const quantity = inputs.map((input, index) => (
    <Box
      key={input}
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: "25px",
        height: "75px",

      }}>
      <Controller
        name={input}
        control={control}
        defaultValue=''
        render={({ field: { ref, value, onChange, onBlur } }) => (
          <Input
            //error={Boolean(errors['1'])}
            label="Email"
            fullWidth
            // defaultValue=''
            //helperText={errors['1']?.message}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            inputRef={ref}
          />
        )}
      />
      <Button
        disabled={index === 0 ? true : false}
        onClick={() => handleDeleteInput(input)}
        size='medium'>
        Delete
      </Button>

    </Box>
  ))

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
            mb: '30px'
          }}
        >Enter the email(s) that will receive the invitation
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(submit)}
        >
          {quantity}
          {/* <Box sx={{ mb: "25px", height: "75px" }}>
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
          </Box> */}
          <Button
            disabled={loading}
            size='large'
            onClick={handleAddInput}
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
        </Box>
      </Box >
    </Box>
  )
}

export default SendInvitation