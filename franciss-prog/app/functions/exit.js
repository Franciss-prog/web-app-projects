import Swal from "sweetalert2"


const exit = () => {
    Swal.fire({
        title: "Do tou want to exit? ",
        allowOutsideClick: false,
        confirmButtonText: "yes",
        cancelButtonText: "no",
        showCancelButton: true,
        customClass: {
            confirmButton: "custom-confirm",
            cancelButton: "custom-cancel",
        }
    })
}

export default exit