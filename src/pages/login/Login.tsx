import { Box,  Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";

import Input from "components/UI/input"
import Button from "components/UI/button"

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const submit = (data: any) => {
    console.log(data)
    reset()
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
          autoComplete="off"
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
                  data-testid="input-password"
                  fullWidth
                  helperText={errors.password?.message}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size='large'
              type='submit'>
              Log in
            </Button>
          </Box>
        </Box>
      </Box >
    </Box>
  )
}

export default Login