import { axiosService } from "services/axios.service/axios.service";

interface ownBookingsServiceProps {
  url: string
}

export const roomService = {
  getRooms: () => axiosService.get('rooms'),
  getSoonestBookingsByRoomId: ({ roomId }: { roomId: number }) => axiosService.get(`rooms/info/?roomId=${roomId}&soonestBookingsDays=20`),
  getRoomsStatus1: () => axiosService.get('rooms/info/?officeId=2&soonestBookingsDays=1'),
}