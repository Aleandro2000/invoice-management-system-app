import * as yup from "yup";
import { emailRegexValidator } from "../utils/regex";

export const loginValidator = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegexValidator, "Email must be valid"),
  password: yup.string().required("Password is required"),
});
