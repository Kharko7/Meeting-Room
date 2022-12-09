import { Errors } from "constants/errors";
import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  title: yup.string()
    .required(Errors.titleLength)
    .min(4, Errors.titleLength)
    .max(40, Errors.titleLength),
  description: yup.string()
    .required(Errors.descriptionLength)
    .min(4, Errors.descriptionLength)
    .max(200, Errors.descriptionLength),
  dateStart: yup.string().required('Choose date'),
  dateEnd: yup.string().required('Choose date'),
  selectRoom: yup.string().required(Errors.roomId),
});