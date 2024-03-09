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

const displayToast = (title: string, text: string, type: boolean = true) =>
  Toast.fire({
    icon: type ? "success" : "error",
    title,
    text,
  });

const sessionWrite = (key: string, data: object) =>
  sessionStorage.setItem(key, JSON.stringify(data));

const sessionRead = (key: string) =>
  JSON.parse(sessionStorage.getItem(key) as string);

const sessionDelete = (key: string) => sessionStorage.removeItem(key);

const sessionDeleteAll = (): void => sessionStorage.clear();

const isObjectEmpty = (objectName: object) => !Object.keys(objectName).length;

export {
  emailRegexValidator,
  strongPasswordRegex,
  displayToast,
  sessionRead,
  sessionWrite,
  sessionDelete,
  sessionDeleteAll,
  isObjectEmpty,
};
