import * as yup from "yup";

export const billValidator = yup.object({
  amount: yup.number().required("Amount is required"),
  due_date: yup.date().required("Due Date is required"),
  details: yup.string().required("Details are required"),
});
