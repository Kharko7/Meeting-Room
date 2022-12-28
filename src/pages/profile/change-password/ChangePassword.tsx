import { Box, Typography, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "components/UI/input"
import Button from "components/UI/button"
import { ChangePasswordSchema } from "validators/auth";
import { useAppDispatch } from "hooks/use-toolkit-hooks";
import { changePassword } from "redux/slices/user.slice";
import { ChangePasswordInterface } from "interfaces/User";
import useVisibilityInput from "hooks/use-visibility-input";

interface FormValues {
  password: string;
  newPassword: string;
  confirmPassword?: string;
  email?: string;
}

interface ChangePasswordProps {
  email: string;
  loading: boolean;
}

const ChangePassword = ({ email, loading }: ChangePasswordProps) => {
  const dispatch = useAppDispatch();

  const { inputAdornment: oldPasswordVisibility, showText: showOldPassword } = useVisibilityInput()
  const { inputAdornment: newPasswordVisibility, showText: showNewPassword } = useVisibilityInput()
  const { inputAdornment: confirmPasswordVisibility, showText: showConfirmPassword } = useVisibilityInput()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onBlur',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const submit = (data: FormValues) => {
    data.email = email;
    delete data.confirmPassword;

    dispatch(changePassword(data as ChangePasswordInterface))
  }

  return (
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
      > Change password
      </Typography>
      <Box
        component='form'
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <Box sx={{ mb: "25px", height: "75px" }}>
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                error={Boolean(errors.password)}
                label="Old password"

                type={showOldPassword ? "text" : "password"}
                fullWidth
                helperText={errors.password?.message}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                InputProps={oldPasswordVisibility}
              />
            )}
          />
        </Box>
        <Box sx={{ mb: "25px", height: "75px" }}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                error={Boolean(errors.newPassword)}
                label="Create new password"
                type={showNewPassword ? "text" : "password"}
                fullWidth
                helperText={errors.newPassword?.message}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                InputProps={newPasswordVisibility}
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
                label="Confirm new password"
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
            {loading ? <CircularProgress sx={{ color: '#7e7e82', margin: '0 21px' }} size={22} /> : 'Change password'}
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export default ChangePassword