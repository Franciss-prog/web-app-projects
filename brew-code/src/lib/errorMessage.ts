import Swal from 'sweetalert2';


interface ErrorMessageOptions {
    message: string,
    loading?: boolean,
    timeout?: number,
    inputToRemove?: string
}
const errorMessage = (
	message: string,
	loading?: boolean,
	timeout?: number,
	inputToremove?: string
) => {
	Swal.fire({
		title: message,
		allowOutsideClick: false,
		showConfirmButton: false,
		icon: 'question',
		timer: 1200,
		customClass: {
			popup: 'bg-white text-coffee rounded-2xl',
			icon: 'text-coffee'
		}
	});

	setTimeout(() => (loading = false), timeout);
	inputToremove = '';
	return;
};

export default errorMessage;
