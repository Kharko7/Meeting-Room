import { Typography, Box, Tooltip } from '@mui/material';
import { useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { yupResolver } from "@hookform/resolvers/yup";

import classNames from 'classnames/bind';
import styles from './profileForm.module.scss'
import Avatar from './avatar/Avatar';
import CheckboxWithLabel from 'components/checkbox-with-label';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
    setToLocalStorage
} from 'services/local-storage.service';
import { useAppDispatch, useAppSelector } from 'hooks/use-toolkit-hooks';
import { resetState } from 'redux&saga/slices/user.slice';
import Toggle from 'components/toggle/Toggle';
import ButtonMI from 'components/UI/button';
import Input from 'components/UI/input';
import { UserSchema } from 'validators/auth';
import IconButtonMUI from 'components/UI/icon-button/IconButtonMUI';

const cn = classNames.bind(styles);
interface FormValues {
    firstName: string;
    lastName: string;
}

const ProfileForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [weekends, setWeekends] = useState<boolean>(getFromLocalStorage('weekends') || false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { userRole, lastName, userEmail, firstName } = useAppSelector((state) => state.user);


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
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty, isValid }
    } = useForm<FormValues>({
        mode: 'onBlur',
        resolver: yupResolver(UserSchema),
        defaultValues: {
            firstName,
            lastName,
        }
    });

    const submit = (data: any) => {
        reset()
    }

    const themeLS = getFromLocalStorage('theme');
    let theme = themeLS ? JSON.parse(themeLS) : undefined;

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
                <Box sx={{ mb: '20px', height: '80px', display: 'flex', }}>
                    <Box sx={{ mr: '10px', width: '290px' }}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <Input
                                    error={Boolean(errors.firstName)}
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
                    <Box sx={{ width: '290px' }}>
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
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonMI
                        size='large'
                        type='submit'
                        disabled={!isDirty || !isValid}
                        data-testid='button-log-out'
                    >
                        save changes
                    </ButtonMI>

                </Box>
            </Box>
            {userRole === 'admin'
                && <Tooltip
                    arrow
                    title={<Typography fontSize={14}>Invite users</Typography>}
                    placement="right">
                    <IconButtonMUI
                        sx={{ mt: '30px' }}
                        to="/sendInvitation"
                        icon={<GroupAddIcon />}
                    />
                </Tooltip>}
            <Box sx={{ m: '30px 0' }}>
                < CheckboxWithLabel
                    label='Show weekends on calendar'
                    checked={weekends}
                    onChange={handleWeekendsToggle}
                    sx={{ marginLeft: '0', color: 'var(--accent-text-color)', fontSize: '20px' }}
                />
            </Box>

            <Box sx={{ textAlign: 'end' }}>
                <ButtonMI
                    size='large'
                    data-testid='button-log-out'
                    onClick={handleLogOut}
                >
                    Log out
                </ButtonMI>
            </Box>
        </Box >
    )
}

export default ProfileForm