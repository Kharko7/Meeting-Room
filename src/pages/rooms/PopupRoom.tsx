import Swal from "sweetalert2";
import "animate.css";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  showClass: {
    popup: "animate__animated  animate__bounceIn animate__headShake",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut",
  },
  background: "var(--base1)",
  color: "var(--mainColorFont)",
});

export const RoomBookingPopup = {
  ErrorPopup: (res: string | number) => {
    return Toast.fire({
      icon: "error",
      title: res,
      timer: 2000,
      timerProgressBar: true,
    });
  },

  Success: async () => {
    return Toast.fire({
      icon: "success",
      title: "Booking successfully created",
      timer: 1000,
      timerProgressBar: true,
    });
  },

  Pending: () => {
    return Toast.fire({
      icon: "info",
      title: "Booking is being created",
      timer: 800,
    });
  },
};
