import { axiosService } from "../axios.service/axios.service";

export const RoomsService = {
  getRooms: async () => {
    console.log("getRooms");
    return await axiosService.get("rooms");
  },
  getSoonestBookingsDays: async (roomId: number) => {
    console.log("getSoonestBookingsDays");
    return await axiosService.get(
      `rooms/info/?roomId=${roomId}&soonestBookingsDays=20`
    );
  },
  getRoomsStatus1: async () => {
    console.log("getRoomsStatus1");
    return await axiosService.get(
      `rooms/info/?officeId=1&soonestBookingsDays=1`
    );
  },
  getRoomsStatus2: async () => {
    console.log("getRoomsStatus2");
    return await axiosService.get(
      `rooms/info/?officeId=2&soonestBookingsDays=1`
    );
  },
};
