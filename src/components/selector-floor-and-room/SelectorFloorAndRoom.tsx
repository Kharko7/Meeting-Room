import { InputLabel, FormControl, MenuItem, FormHelperText } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/use-toolkit-hooks';
import { styles } from './selector-styles'
import { Rooms } from 'interfaces/Rooms';
import { getRooms } from 'redux/slices/room.slice';

interface SelectorProps {
  edit?: boolean;
  valueFloor: string;
  valueRoom?: string;
  errorFloor?: string;
  errorRoom?: string;
  onChangeFloor: (event: SelectChangeEvent<string>) => void;
  onChangeRoom: (event: SelectChangeEvent<string>) => void;
}

const SelectorFloorAndRoom = ({ valueFloor, valueRoom = '', errorFloor = '', errorRoom = '', edit = false, onChangeFloor, onChangeRoom }: SelectorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { rooms, floors } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();
  let roomsInArray: Rooms[] = []
  Object.values(rooms).forEach((roomsArray) => roomsInArray.push(...roomsArray))

  const loading = open && roomsInArray.length === 0;
  const loadingEdit = edit && roomsInArray.length === 0


  useEffect(() => {
    if (!loading) {
      return
    };

    dispatch(getRooms());
  }, [dispatch, loading]);

  useEffect(() => {
    if (!loadingEdit) {
      return;
    }

    dispatch(getRooms());
  }, [dispatch, loadingEdit]);

  let floorByRoomId: Rooms | undefined;
  if (valueRoom) {
    floorByRoomId = roomsInArray.find((room) => {
      return room.roomId === Number(valueRoom)
    })
  }
  const getFloor = valueFloor && !valueRoom ? valueFloor : floorByRoomId?.floor || '';

  const roomsByFloor = roomsInArray.filter((room) => {
    return room.floor === Number(getFloor)
  })
  const itemLoading = <MenuItem sx={{ cursor: 'default' }} ><i>Loading...</i></MenuItem >

  const menuItemsRoom = floors.length && roomsByFloor ? roomsByFloor.map((room: any) => (
    <MenuItem
      key={room.roomId}
      value={room.roomId}>
      {room.name}
    </MenuItem>
  )) : itemLoading

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
        error={Boolean(errorFloor)}
        fullWidth
        sx={styles.selector}
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
          value={valueFloor && !valueRoom ? valueFloor : floorByRoomId?.floor.toString() || ''}
          onChange={onChangeFloor}
        >
          {menuItemsFloor}
        </Select >
        <FormHelperText variant='filled' error color='red'>{errorFloor}</FormHelperText>
      </FormControl >
      <FormControl
        error={Boolean(errorRoom)}
        disabled={Boolean(!valueRoom) && !valueFloor}
        fullWidth
        sx={styles.selector}
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
        <FormHelperText variant='filled' error color='red'>{errorRoom}</FormHelperText>
      </FormControl>
    </>
  );
}

export default SelectorFloorAndRoom