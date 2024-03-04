import * as yup from "yup";
import { emailRegexValidator, strongPasswordRegex } from "../utils/regex";

export const registerValidator = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegexValidator, "Email must be valid"),
  password: yup
    .string()
    .required("Password is required")
    .matches(strongPasswordRegex, "Password must be strong"),
});
