import Swal from "sweetalert2";


// add parameter for future purposes
const successMessage = (message: string): void => {
    Swal.fire({
        title: message,
        allowOutsideClick: false,
        showConfirmButton: false,
        icon: "success",
        timer: 1200,
        customClass: {
            popup: "bg-white text-coffee rounded-2xl",
            icon: "text-coffee"
        }
    })
}

export default successMessage