import { AddOneBooking, AddRcurringBooking } from "interfaces/booking/Booking";
import { axiosService } from "services/axios.service/axios.service";

interface bookingServiceProps {
  url: string
}
interface bookingServicePost extends bookingServiceProps {
  body: AddOneBooking | AddRcurringBooking
}

export const bookingService = {
  get: ({ url }: bookingServiceProps) => axiosService.get(url),
  post: ({ url, body }: bookingServicePost) => axiosService.post(url, body),
  //delete: ({ url }: bookingServiceProps) => axiosService.delete(url),
}