import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { useState } from 'react'
import classNames from 'classnames/bind';
import styles from './profileForm.module.scss'
import Avatar from './avatar/Avatar';
import Button from 'components/button';
import { SubmitHandler, useForm, Controller, useController } from "react-hook-form";
import CheckboxWithLabel from 'components/checkbox-with-label';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from 'services/local-storage.service';
import { Errors } from 'constants/errors';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';


const cn = classNames.bind(styles);

interface FormValues {
  firsName: string;
  lastName: string;
};

type FormName = 'firsName' | 'lastName'
const userName: FormName[] = ['firsName', 'lastName']

const user = { firsName: 'Yaroslav', lastName: 'Kharko' }

const ProfileForm = () => {
  const [weekends, setWeekends] = useState<boolean>(getFromLocalStorage('weekends') || false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const navigate = useNavigate()

  const handleWeekendsToggle = () => {
    setWeekends(prev => !prev)
    setToLocalStorage('weekends', !weekends)
  }

  const handleImageUrl = (url: string) => {
    setImageUrl(url)
  }
  const handleSelectedImg = (file: File) => {
    setSelectedImage(file)
  }
  const handleLogOut = () => {
    removeFromLocalStorage('token')
    /// dispatch(userLogout())
    navigate('/login', { replace: true })
  }

  const { reset, register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormValues>({ mode: 'onBlur' });

  const submit = (data: any) => {
    console.log(data)
    reset()
  }
  const inputUserName = userName.map((name: FormName) => (
    <TextField
      key={name}
      sx={{ mr: '10px', width: '290px' }}
      defaultValue={user[name] || ''}
      label={name === 'firsName' ? 'First name' : 'Last name'}
      error={Boolean(errors[name])}
      helperText={errors[name] ? errors[name]?.message : ''}
      {...register(name, {
        required: Errors.userLength,
        maxLength: {
          value: 25,
          message: Errors.userLength
        },
        minLength: {
          value: 2,
          message: Errors.userLength
        }
      })}
    />
  ))

  return (
    <Box className={cn('ProfileContainer')} >
      <Box sx={{ color: 'var(--accent-text-color)' }} component="h1"> Profile </Box>
      <Box sx={{ position: 'relative', textAlign: 'center', mb: '40px', }}>
        <Avatar
          imageUrl={imageUrl}
          handleImageUrl={handleImageUrl}
          handleSelectedImg={handleSelectedImg}
        />
        <Typography
          variant='h5'
          sx={{ mt: '20px', textAlign: 'center', color: 'var(--accent-text-color)' }}
        >  user@incorainc.com
        </Typography>
      </Box>
      <Box
        component='form'
        className={cn('form')}
        autoComplete="off"
        onSubmit={handleSubmit(submit)}
      >
        <Box sx={{ mb: '20px', height: '80px' }}>
          {inputUserName}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            disabled={!isDirty || !isValid}
            type='submit'
            onclick={() => { }}>
            save changes
          </Button>
        </Box>
      </Box>
      <Box sx={{ m: '30px 0' }}>
        < CheckboxWithLabel
          label='Show weekends on calendar'
          checked={weekends}
          onChange={handleWeekendsToggle}
          sx={{ marginLeft: '0', color: 'var(--accent-text-color)', fontSize: '20px' }}
        />
      </Box>
      <Box sx={{ textAlign: 'end' }}>
        <Button
          onclick={handleLogOut}
        >
          Log out
        </Button>
      </Box>
    </Box >
  )
}

export default ProfileForm