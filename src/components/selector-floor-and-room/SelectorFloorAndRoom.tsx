import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormHelperText } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/toolkitHooks';
import { Rooms, roomsActions } from 'redux&saga/slices/rooms.slice';
import { styles } from './selector-styles'

interface SelectorProps {
  edit?: boolean;
  valueFloor: string;
  valueRoom: string;
  errorMsg?: Record<string, string>;
  onChangeFloor: (event: SelectChangeEvent<string>) => void;
  onChangeRoom: (event: SelectChangeEvent<string>) => void;
}

const SelectorFloorAndRoom = ({ valueFloor, valueRoom, errorMsg = {}, edit = false, onChangeFloor, onChangeRoom }: SelectorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { rooms, floors } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();

  const loading = open && rooms.length === 0;
  const loadingEdit = edit && rooms.length === 0

  useEffect(() => {
    if (!loading) {
      return
    };

    dispatch(roomsActions.getRooms());
  }, [dispatch, loading]);

  useEffect(() => {
    if (!loadingEdit) {
      return;
    }

    dispatch(roomsActions.getRooms());
  }, [dispatch, loadingEdit]);

  let floorByRoomId: Rooms | undefined;
  if (!valueFloor && valueRoom) {
    floorByRoomId = rooms.find((room) => {
      return room.roomId === Number(valueRoom)
    })
  }

  const roomsByFloor = rooms.filter((room) => {
    return room.floor === (Number(valueFloor) || floorByRoomId?.floor)
  })

  const itemLoading = <MenuItem sx={{ cursor: 'default' }} ><i>Loading...</i></MenuItem >

  const menuItemsRoom = roomsByFloor ? roomsByFloor.map((room: any) => (
    <MenuItem
      key={room.roomId}
      value={room.roomId}>
      {room.name}
    </MenuItem>
  )) : null

  const menuItemsFloor = floors.length ? floors.map((floor) => (
    <MenuItem
      key={floor}
      value={floor}>
      {floor}
    </MenuItem>
  )) : itemLoading

  return (
    <>
      <FormControl
        error={Boolean(errorMsg.floor)}
        fullWidth
        sx={{
          '& .MuiSelect-select': styles.input
        }}
      >
        <InputLabel >{'Choose floor'}</InputLabel>
        <Select
          MenuProps={{
            disableAutoFocusItem: true,
            sx: {
              '& .MuiPaper-root': styles.paper
            }
          }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          data-testid='selector-floor'
          value={valueFloor ? valueFloor : floorByRoomId?.floor.toString() || ''}
          onChange={onChangeFloor}
        >
          {menuItemsFloor}
        </Select >
        <FormHelperText variant='filled' error color='red'>{errorMsg.floor ? errorMsg.floor : ''}</FormHelperText>
      </FormControl >
      <FormControl
        error={Boolean(errorMsg.roomId)}
        disabled={Boolean(!valueRoom) && !valueFloor}
        fullWidth
        sx={{
          '& .MuiSelect-select': styles.input
        }}
      >
        <InputLabel >{'Choose room'}</InputLabel>
        <Select
          MenuProps={{
            disableAutoFocusItem: true,
            sx: {
              '& .MuiPaper-root': styles.paper
            }
          }}
          value={valueRoom}
          onChange={onChangeRoom}
          data-testid='selector-room'
        >
          {loadingEdit ? itemLoading : menuItemsRoom}
        </Select>
        <FormHelperText variant='filled' error color='red'>{errorMsg.roomId ? errorMsg.roomId : ''}</FormHelperText>
      </FormControl>
    </>
  );
}

export default SelectorFloorAndRoom