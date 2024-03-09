import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { InvoiceInterface } from "../interfaces/invoice.interface";
import { BillInterface } from "../interfaces/bill.interface";
import { Field, Form, Formik } from "formik";
import { billValidator } from "../validators/bill.validator";
import { invoiceValidator } from "../validators/invoice.validator";
import { AlertTemplate } from "./alert.template";

const ModalTemplate: React.FC<{
  isOpen: boolean;
  onClose: (params: any) => any;
  onSave?: any;
  title?: string;
  closeText?: string;
  saveChangesText?: string;
  viewMode?: boolean;
  data?: InvoiceInterface | BillInterface;
  type?: string;
}> = ({
  isOpen,
  onClose,
  onSave,
  title,
  closeText,
  saveChangesText,
  viewMode,
  data,
  type,
}): JSX.Element => {
  const handleSubmit = (values: any) => onSave(values);

  const getValidationSchema = () => {
    switch (type) {
      case "bill":
        return billValidator;
      case "invoice":
        return invoiceValidator;
      default:
        return null;
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fade-in fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid rounded-t-lg border-gray-200">
                <h3 className="text-xl font-semibold">{title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <FontAwesomeIcon icon={faClose} />
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                {viewMode ? (
                  <></>
                ) : (
                  getValidationSchema() && (
                    <Formik
                      initialValues={{
                        amount: data?.amount,
                        details: data?.details,
                        due_date: data?.due_date,
                      }}
                      validationSchema={getValidationSchema()}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form className="mx-auto py-12 max-w-[400px]">
                          <Field
                            type="number"
                            className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-black focus:border-black duration-300"
                            placeholder="Amount"
                            name="amount"
                          />
                          {errors?.amount && touched?.amount && (
                            <AlertTemplate message={errors?.amount} />
                          )}
                          <Field
                            type="text"
                            className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-black focus:border-black duration-300"
                            placeholder="Details"
                            name="details"
                          />
                          {errors?.details && touched?.details && (
                            <AlertTemplate message={errors?.details} />
                          )}
                          <Field
                            type="datetime-local"
                            className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-black focus:border-black duration-300"
                            placeholder="Due Date"
                            name="due_date"
                          />
                          {errors?.due_date && touched?.due_date && (
                            <AlertTemplate message={errors?.due_date} />
                          )}
                        </Form>
                      )}
                    </Formik>
                  )
                )}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid rounded-b-lg border-gray-200">
                <button
                  className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={onClose}
                >
                  {closeText || "Close"}
                </button>
                <button
                  className="bg-black text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={onSave}
                >
                  {saveChangesText || "Save Change"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTemplate;
