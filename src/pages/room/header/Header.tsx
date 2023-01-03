import { Box } from "@mui/material"

import ButtonMI from "components/UI/button/Button"

interface HeaderProps {
  floors: number[];
  showFloors: number[];
  handleShowFloors: (floor: number[]) => void;
}

const Header = ({ floors, showFloors, handleShowFloors }: HeaderProps) => {

  const buttonsFloors = floors.map((floor: number) => {
    const pickedFloor = showFloors.length === 1 ? showFloors[0] : null

    return (
      <ButtonMI
        key={floor}
        sx={{ ml: '20px', borderRadius: '10px' }}
        disabled={pickedFloor === floor}
        onClick={() => handleShowFloors([floor])}
      >
        {`Floor ${floor}`}
      </ButtonMI>
    )
  })

  return (
    <Box
      sx={{
        height: '70px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <ButtonMI
        sx={{ borderRadius: '10px' }}
        disabled={showFloors.length === floors.length}
        onClick={() => handleShowFloors(floors)}
      >
        All
      </ButtonMI>
      {buttonsFloors}
    </Box >
  )
}

export default Header