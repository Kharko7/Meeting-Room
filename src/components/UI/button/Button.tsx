import { Button, ButtonProps } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { styles } from "./button.styles"

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        sizeSmall: {
          fontSize: '12px',
          padding: '9px 20px 8px'
        },
        sizeMedium: {
          fontSize: '12px',
          padding: '10px 30px 9px'
        },
        sizeLarge: {
          padding: '11px 40px 10px',
          fontSize: '18px'
        },
      },
    }
  }
})

const ButtonMI = ({ ...props }: ButtonProps) => {
  const { sx, ...rest } = props

  return (
    <ThemeProvider theme={theme}>
      <Button
        sx={{ ...styles.button, ...sx }}
        {...rest}
      />
    </ThemeProvider>

  )
}
export default ButtonMI