import { urls } from "../../constants/urls/urls";
import { axiosService } from "../axios.service/axios.service";
import { RegistrationProps } from "../../interfaces/auth/AuthProps";
import axios from "axios";

export const OwnBookingsService = {
  getOwnBookings: async (next:number=1) => {
    console.log("getOwnBookings");
    return await axiosService.get(`bookings/own?page=${next}&limit=4`);
  },
};

