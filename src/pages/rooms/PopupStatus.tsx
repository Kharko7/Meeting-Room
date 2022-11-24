import Swal from "sweetalert2";
import "animate.css";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-left",
  showConfirmButton: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
  showClass: {
    popup: "animate__animated  animate__bounceIn ",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut",
  },
  background: "var(--base1)",
  color: "var(--mainColorFont)",
 width:"90px",
});

export const ResponsePopup = {
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
      title: "",
      timer: 1000,
      timerProgressBar: true,
    });
  },
  Wait: async () => {
    return Toast.fire({
      icon: "info",
      title: "Please wait, room status is being updated",
      timer: 1000,
      timerProgressBar: true,
    });
  },

  Pending: () => {
    return Toast.fire({
      icon: "info",
      title: "Pending data to the server",
      timer: 800,
    });
  },
};
