import { emailRegexValidator, strongPasswordRegex } from "./regex";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCancelButton: true,
  cancelButtonColor: "#000000",
  cancelButtonText: "OK",
  cancelButtonAriaLabel: "Cancel button",
  focusCancel: false,
  inputAutoFocus: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const displayToast = (title: string, text: string, type = true) =>
  Toast.fire({
    icon: type ? "success" : "error",
    title,
    text,
  });

export default {
  emailRegexValidator,
  strongPasswordRegex,
  displayToast,
};
