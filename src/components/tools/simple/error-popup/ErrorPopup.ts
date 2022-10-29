import Swal from "sweetalert2";

export const  ErrorPopup = async (res: any) => {
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

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
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



    return   Toast.fire({
        icon: 'error',
        title: res.message
    })
}