import {TextField, Typography, Box} from '@mui/material';
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './profileForm.module.scss'
import Avatar from './avatar/Avatar';
import Button from 'components/button';
import CheckboxWithLabel from 'components/checkbox-with-label';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage
} from 'services/local-storage.service';
import { Errors } from 'constants/errors';
import Toggle from "../toggle/Toggle";
import { useAppDispatch, useAppSelector } from 'hooks/toolkitHooks';
import { resetState } from 'redux&saga/slices/user.slice';

const cn = classNames.bind(styles);
interface FormValues {
    firstName: string;
    lastName: string;
}
type FormName = 'firstName' | 'lastName'
const userName: FormName[] = ['firstName', 'lastName']

const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [weekends, setWeekends] = useState<boolean>(getFromLocalStorage('weekends') || false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { lastName, userEmail, firstName } = useAppSelector((state) => state.user);


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
        dispatch(resetState())
        removeFromLocalStorage('token')
        navigate('/login', { replace: true })
    }

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<FormValues>({
        mode: 'onBlur',
        defaultValues: {
            firstName,
            lastName
        }
    });

    const submit = (data: any) => {
        reset()
    }

    const themeLS = getFromLocalStorage('theme');
    let theme = themeLS ? JSON.parse(themeLS) : undefined;

    const inputUserName = userName.map((name: FormName) => (
        <TextField
            key={name}
            sx={{ mr: '10px', width: '290px' }}
            label={name === 'firstName' ? 'First name' : 'Last name'}
            error={Boolean(errors[name])}
            data-testid={name}
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
        <Box className={cn('ProfileContainer')}>
            <div className={cn('profile')}><Box sx={{ color: 'var(--accent-text-color)' }} component="h1"> Profile</Box>
                <div className={cn('toggle')}><Toggle type={"themeToggle"} onclick={() => {
                    theme = !theme;
                    setToLocalStorage('theme', JSON.stringify(theme));
                    theme ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
                }} size={"large"} />
                </div>
            </div>
            <Box sx={{ position: 'relative', textAlign: 'center', mb: '40px', }}>
                <Avatar
                    imageUrl={imageUrl}
                    handleImageUrl={handleImageUrl}
                    handleSelectedImg={handleSelectedImg}
                />
                <Typography
                    variant='h5'
                    sx={{ mt: '20px', textAlign: 'center', color: 'var(--accent-text-color)' }}
                > {userEmail}
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
                        onclick={() => {
                        }}>
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
                    dataTestId='button-log-out'
                    onclick={handleLogOut}
                >
                    Log out
                </Button>
            </Box>
        </Box>
    )
}

export default ProfileForm