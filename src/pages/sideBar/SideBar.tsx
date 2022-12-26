import { Box } from "@mui/material"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import Main from "./main/Main"


const SideBar = () => {
  return (
    <Box
      sx={{
        m: '10px 10px 14px 0',
        height: 'Calc(100% - 20px)',

      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--outset-box-shadow)',
          borderRadius: ' 20px',
          height: '92%',
          mb: '10px',
          p: '10px'
        }}
      >

        <Header />
        <Main />
      </Box>
      <Footer />
    </Box >
  )
}

export default SideBar