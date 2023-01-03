import { OndemandVideoOutlined, HeatPump, VideogameAssetOutlined, CropLandscapeOutlined } from '@mui/icons-material';

import { Devices } from 'interfaces/Rooms';

export const showDevices = (devices: Devices[]) => {
  return devices.map((device: Devices) => {
    switch (device.name) {
      case 'screen':
        return (
          <CropLandscapeOutlined key={device.name} sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '30px',
            mr: '20px',
          }
          } />
        )
      case 'projector':
        return (
          <VideogameAssetOutlined key={device.name} sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '30px',
            mr: '20px',
          }} />
        )
      case 'air conditioner':
        return (
          <HeatPump key={device.name} sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '30px',
            mr: '20px',
          }} />
        )
      case 'white board':
        return (
          <OndemandVideoOutlined key={device.name} sx={{
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '30px',
            mr: '20px',
          }} />
        )
      default: return null
    }
  })
}
