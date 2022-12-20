import { Box, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "components/UI/input"
import Button from "components/UI/button"
import { RegisterSchema } from "validators/auth";
import useVisibilityInput from "hooks/use-visibility-input";

interface FormValues {
  firstName: string;
  lastName: string;
  confirmPassword?: string;
  password: string;
  email?: string;
}

interface RegisterFormProps {
  loading: boolean;
  onSubmit: (data: FormValues) => void;
}

const RegisterForm = ({ loading, onSubmit }: RegisterFormProps) => {
  const { inputAdornment: passwordVisibility, showText: showPassword } = useVisibilityInput()
  const { inputAdornment: confirmPasswordVisibility, showText: showConfirmPassword } = useVisibilityInput()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    }
  });

  return (
    <Box
      component='form'
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box sx={{ mb: "25px", height: "75px" }}>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              error={Boolean(errors.firstName)}
              autoFocus
              label="First name"
              fullWidth
              helperText={errors.firstName?.message}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
      </Box>
      <Box sx={{ mb: "25px", height: "75px" }}>
        <Controller
          name="lastName"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              error={Boolean(errors.lastName)}
              label="Last name"
              fullWidth
              helperText={errors.lastName?.message}
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
              label="Create password"
              type={showPassword ? "text" : "password"}
              data-testid="input-password"
              fullWidth
              FormHelperTextProps={{ sx: { whiteSpace: 'normal' } }}
              helperText={errors.password?.message}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              InputProps={passwordVisibility}
            />
          )}
        />
      </Box>
      <Box sx={{ mb: "25px", height: "75px" }}>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              error={Boolean(errors.confirmPassword)}
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              helperText={errors.confirmPassword?.message}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              InputProps={confirmPasswordVisibility}
            />
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={loading}
          size='large'
          type='submit'>
          {loading ? <CircularProgress sx={{ color: '#7e7e82', margin: '0 21px' }} size={22} /> : 'Registration'}
        </Button>
      </Box>
    </Box>
  )
}

export default RegisterForm