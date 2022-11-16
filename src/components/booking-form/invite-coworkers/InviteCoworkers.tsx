import { useState } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Box } from '@material-ui/core';

const userss = ['Yaroslav Kharko', 'fsdxca ssds', 'oleg erdo', 'andse lidds', 'nikita oluua', 'roma sasdk', 'fjwoiew ldfas', 'sadfj owerw', 'aaaa aaa', 'daaad daa', 'aaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa']

const InviteCoworkers = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [invitedUsers, setInvitedUsers] = useState<string[]>([])

  const removeUser = (user: string) => {
    const users = invitedUsers.filter(userName => userName !== user)
    setInvitedUsers(users)
  }

  const getUsers = userss.filter((user) => {
    if (inputValue.trim()) {
      return user.toLocaleLowerCase().includes(inputValue.trim().toLocaleLowerCase()) && !invitedUsers.includes(user)
    }
    return false
  })

  const listUsers = getUsers.map((item, index) => (
    <MenuItem
      key={index} onClick={() => setInvitedUsers(prev => [...prev, item])} >
      {item}
    </MenuItem>
  ))
  const listInvitedUsers = invitedUsers.map((user, index) => (
    <MenuItem
      sx={{ cursor: 'default', '&:hover': { backgroundColor: 'transparent' }, justifyContent: 'space-between' }}
      disableRipple
      key={index}>
      {user}
      <IconButton
        sx={{ ml: '20px' }}
        onClick={() => removeUser(user)} >
        <DeleteIcon />
      </IconButton>
    </MenuItem >
  ))

  return (
    <>
      <TextField
        label="Invite coworkers"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <MenuList
        sx={{ height: '225px', overflow: 'hidden', zIndex: '1' }}>
        {listUsers}
      </MenuList>
      {
        invitedUsers.length > 0 && (
          <MenuList
            sx={{ borderTop: '3px solid var(--accent-text-color)', overflow: 'auto', maxHeight: '220px', zIndex: '1' }}
          >
            {listInvitedUsers}
          </MenuList>
        )
      }
    </>
  );
}

export default InviteCoworkers