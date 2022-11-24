import { axiosService } from "../axios.service/axios.service";

export const RoomsService = {
  getRooms: async () => {

    return await axiosService.get("rooms");
  },
  getSoonestBookingsDays: async (roomId: number) => {

    return await axiosService.get(
      `rooms/info/?roomId=${roomId}&soonestBookingsDays=20`
    );
  },
  getRoomsStatus1: async () => {

    return await axiosService.get(
      `rooms/info/?officeId=1&soonestBookingsDays=1`
    );
  },
  getRoomsStatus2: async () => {

    return await axiosService.get(
      `rooms/info/?officeId=2&soonestBookingsDays=1`
    );
  },
};
