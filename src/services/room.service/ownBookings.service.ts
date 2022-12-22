import { axiosService } from "../axios.service/axios.service";
import axios from "axios";

export const OwnBookingsService = {
  getOwnBookings: async (next:number=1) => { 
    return await axiosService.get(`bookings/own?page=${next}&limit=5`);
  },
};

