import { TextField, TextFieldProps } from "@mui/material"
//import styles from "./input.module.scss"
import { styles } from "./input.styles"

const Input = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      sx={styles.input}
     // className={styles.label}
      {...props}
    />
  )
}
export default Input