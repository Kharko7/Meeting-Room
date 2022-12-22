import { TextField, TextFieldProps } from "@mui/material"
//import styles from "./input.module.scss"
import { styles } from "./input.styles"

const Input = ({ ...props }: TextFieldProps) => {
  const { sx, ...rest } = props

  return (
    <TextField
      sx={{ ...styles.input, ...sx }}
      // className={styles.label}
      {...rest}
    />
  )
}
export default Input