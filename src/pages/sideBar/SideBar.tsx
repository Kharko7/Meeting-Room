import { Box } from "@mui/material"
import Footer from "./footer/Footer"
import Header from "./header/Header"
import Main from "./main/Main"


const SideBar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        right: '10px',
        width: 'Calc(100% - 80% - 10px)',
        height: 'Calc(100% - 20px)',
        m: '10px 0px 14px 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--outset-box-shadow)',
          borderRadius: ' 15px',
          height: '92%',
          mb: '10px',
          p: '10px',
          backgroundColor: 'var(--calendar-bg)',
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