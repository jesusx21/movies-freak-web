import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastParams = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'dark',
  draggable: true,
  progress: undefined
};

export function notifyError(message) {
  message ||= 'Error getting response from server';
  toast.error(message, toastParams);
}

export function notifySuccess(message) {
  toast.success(message, toastParams);
}
