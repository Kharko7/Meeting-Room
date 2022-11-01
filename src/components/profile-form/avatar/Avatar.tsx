import { Box } from '@mui/material';
import React from 'react'
import classNames from 'classnames/bind';
import styles from './avatar.module.scss'
import UserIcon from 'assets/User.png'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const cn = classNames.bind(styles);

interface AvatarProps {
  imageUrl: string | null
  handleImageUrl: (url: string) => void;
  handleSelectedImg: (file: File) => void;
}
const Avatar = ({ imageUrl, handleImageUrl, handleSelectedImg }: AvatarProps) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    //@ts-ignore
    handleImageUrl(reader.result)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target != null) {
      const files = (event.target as HTMLInputElement).files
      if (files) {
        //handleSelectedImg(files[0])
        reader.readAsDataURL(files[0]);
      }
    }
  }
  return (
    <>
      <Box
        component='img'
        className={cn('image')}
        alt='User'
        src={imageUrl ? imageUrl : UserIcon}
      />
      <Box
        component='input'
        className={cn('hidden')}
        id='photoUpload'
        type='file'
        accept='image/jpg, image/jpeg, image/png'
        onChange={handleChange}
      />
      <Box
        component='label'
        className={cn('lableContainer')}
        htmlFor='photoUpload'
      >
        <AddPhotoAlternateIcon
          fontSize='large'
          color='info' />
      </Box>
    </>
  )
}

export default Avatar