import Swal from "sweetalert2";
import 'animate.css';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    showClass: {
        popup: 'animate__animated  animate__bounceIn animate__headShake'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOut'
    },
})

export const ResponsePopup = {
    ErrorPopup: (res: string|number) => {
        return Toast.fire({
            icon: 'error',
            title: res,
            timer: 3000,
            timerProgressBar: true,

        })
    },

    Success: async () => {
        return Toast.fire({
            icon: 'success',
            title: "Successful response",
            timer: 1000,
            timerProgressBar: true,

        })
    },

    Pending: () => {
        return Toast.fire({
            icon: 'info',
            title: "Pending data to the server",
            timer: 800,
        })
    },


}


//     return await Swal.fire({
//         title: res.message,
//         width: 300,
//         color: '#d55d5d',
//         confirmButtonColor: '#5bbde0',
//         confirmButtonAriaLabel: '#5bbde0',
//         background: '#f4f6fa',
//         position: 'bottom',
//         icon: 'error',
//         iconColor: '#d55d5d',
//         showConfirmButton: false,
//         timer: 2500,
//         timerProgressBar: true,
//         showClass: {
//             popup: 'animate__animated animate__bounceIn animate__headShake'
//         },
//         hideClass: {
//             popup: 'animate__animated animate__bounceOutUp'
//         },
//         backdrop: `
//     url("https://i.pinimg.com/originals/fb/ed/b2/fbedb25b550829b8b4c4984b45992b39.gif")
//     left bottom
//     no-repeat
//   `,
// toast:true    })