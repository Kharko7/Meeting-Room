import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './selector.module.scss'
import { FormHelperText } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { Box } from "@mui/system";
import { axiosService } from 'services/axios.service/axios.service';
import { useAppDispatch, useAppSelector } from 'hooks/toolkitHooks';
import { roomsActions } from 'redux&saga/slices/rooms.slice';



interface SelectorProps {
  valueFloor: string;
  valueRoom: string;
  //   errorMsg?: string;
  //   disabled?: boolean;
  //   label: string;
  //   menuItems: React.ReactNode;
  //   dataTestId: string;
  onChangeFloor: (event: SelectChangeEvent<string>) => void;
  onChangeRoom: (event: SelectChangeEvent<string>) => void;
}

const SelectorFloorAndRoom = ({ valueFloor, valueRoom, onChangeFloor, onChangeRoom }: SelectorProps) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>({});
  //const { roomsByFloor, floors } = useAppSelector((state) => state.rooms);
  const loading = (valueRoom && !open && Object.keys(options).length === 0) || open && Object.keys(options).length === 0

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(roomsActions.getRooms());
  // }, []);
  console.log(valueRoom)
  useEffect(() => {
    // if (!loading) {
    //   return;
    // }
    console.log('reeeeequest111111111111')
    axiosService.get('rooms')
      .then((response) => {
        setOptions(response.data)
      }).catch((error) => console.log(error))
  }, []);

  const menuItemsFloor = Object.keys(options).length ? Object.keys(options).map((floor) => (
    <MenuItem
      key={floor}
      value={floor}>
      {floor}
    </MenuItem>
  )) : (<MenuItem sx={{ cursor: 'default' }} >
    <i >Loading...</i >
  </MenuItem >)

  const roomsByFloor = valueFloor && Object.keys(options).length ? options[valueFloor].map((room: any) => {
    return { roomId: room.roomId, name: room.name }
  }) : null

  console.log(Object.values(options))
  console.log(valueFloor)

  let floorByRoomId1: any = {};
  const floorByRoomId: any = valueRoom && Object.keys(options).length && Object.values(options).find((array: any) => {
    let a = array.find((room: any) => {
      return room.roomId === Number(valueRoom)
    })
    if (a !== undefined) {
      floorByRoomId1 = a;
    }
    return a !== undefined
  })


  console.log(floorByRoomId1)
  console.log(valueFloor ? valueFloor : floorByRoomId1?.floor?.toString())
  const menuItemsRoom = roomsByFloor ? roomsByFloor.map((room: any) => (
    <MenuItem
      key={room.roomId}
      value={room.roomId}>
      {room.name}
    </MenuItem>
  )) : null

  return (
    <>
      <FormControl
        // error={Boolean(errorMsg)}
        fullWidth>
        <InputLabel >{'Choose floor'}</InputLabel>
        <Select
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          //data-testid={dataTestId}
          //defaultValue={floorByRoomId1?.floor?.toString()}
          value={valueFloor ? valueFloor : floorByRoomId1?.floor?.toString()}
          MenuProps={{ disableAutoFocusItem: true }}
          onChange={onChangeFloor}
        >
          {menuItemsFloor}
        </Select >
        {/* <FormHelperText variant='filled' error color='red'>{errorMsg ? errorMsg : ''}</FormHelperText> */}
      </FormControl >
      <FormControl
        disabled={!valueFloor}
        fullWidth>
        <InputLabel >{'Choose room'}</InputLabel>
        <Select
          value={valueRoom}
          MenuProps={{ disableAutoFocusItem: true }}
          onChange={onChangeRoom}
        >
          {menuItemsRoom}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectorFloorAndRoom