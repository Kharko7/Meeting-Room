import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import MockedData from "../components/MockedData";
import styles from "./select.module.scss";
import "./select.scss";
const Selector = () => {
  const [room, setRoom] = useState(MockedData[0].name);
  const [floor, setFloor] = useState("1");
  const floorCount = 4;
  const arr = Array.from({ length: floorCount }, (_, i) => i + 1);
  //@ts-ignore
  const handleRoomChange = (event) => {
    console.log(event.target.value as string);
    setRoom(event.target.value as string);
  };
  //@ts-ignore
  const handleFloorChange = (event) => {
    console.log(event.target.value as string);
    setFloor(event.target.value as string);
  };
  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={floor}
          label="Floor"
          onChange={handleFloorChange}
        >
          {arr.map((currentFloor) => {
            return <MenuItem value={currentFloor}>{currentFloor}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={room}
          label="Room"
          onChange={handleRoomChange}
        >
          {MockedData.map((data) => {
            if (data.floor.toString() == floor.toString()) {
              return <MenuItem value={data.name}>{data.name}</MenuItem>;
            }
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Selector;
