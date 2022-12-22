import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from "react";

const useVisibilityInput = () => {
  const [showText, setShowText] = useState<boolean>(false)

  const inputAdornment = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setShowText(!showText)}>
          {showText ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }

  return { inputAdornment, showText }
}

export default useVisibilityInput