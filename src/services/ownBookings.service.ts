import { axiosService } from "services/axios.service/axios.service";

interface ownBookingsServiceProps {
  url: string
}

export const ownBookingsService = {
  getOwnBookings: ({ url }: ownBookingsServiceProps) => axiosService.get(url),
}