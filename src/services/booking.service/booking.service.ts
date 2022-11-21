import { OneBooking, RcurringBooking } from "interfaces/booking/Booking";
import { axiosService } from "services/axios.service/axios.service";

interface bookingServiceProps {
  url: string
}
interface bookingServicePost extends bookingServiceProps {
  body: OneBooking | RcurringBooking
}

export const bookingService = {
  get: ({ url }: bookingServiceProps) => axiosService.get(url),
  post: ({ url, body }: bookingServicePost) => axiosService.post(url, body),
  patch: ({ url, body }: bookingServicePost) => axiosService.patch(url, body),
  delete: ({ url }: bookingServiceProps) => axiosService.delete(url),
}