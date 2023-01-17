import { Box } from '@mui/material';
import React from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import classNames from 'classnames/bind';
import styles from './avatar.module.scss'

const cn = classNames.bind(styles);

interface AvatarProps {
  imageUrl: string
  handleImageUrl: (url: string) => void;
  handleSelectedImg: (file: File) => void;
}
const Avatar = ({ imageUrl, handleImageUrl, handleSelectedImg }: AvatarProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target != null) {
      const files = (event.target as HTMLInputElement).files
      if (files) {
        const reader = new FileReader();
        handleSelectedImg(files[0])
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          //@ts-ignore
          handleImageUrl(reader.result)
        }
      }
    }
  }
  return (
    <>
      <Box
        component='img'
        className={cn('image')}
        alt='User'
        src={imageUrl}
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