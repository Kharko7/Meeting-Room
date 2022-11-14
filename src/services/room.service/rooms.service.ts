import { urls } from "../../constants/urls/urls";
import { axiosService } from "../axios.service/axios.service";
import { RegistrationProps } from "../../interfaces/auth/AuthProps";
import axios from "axios";

export const RoomsService = {
  getRooms: async () => {
    return await axiosService.get("rooms");
  },
  getSoonestBookingsDays: async (roomId: number) => {
    return await axiosService.get(
      `rooms/info/?roomId=${roomId}&soonestBookingsDays=20`
    );
  },
};

