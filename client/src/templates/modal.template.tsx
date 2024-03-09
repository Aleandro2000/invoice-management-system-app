import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { InvoiceInterface } from "../interfaces/invoice.interface";
import { BillInterface } from "../interfaces/bill.interface";

const ModalTemplate: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  title?: string;
  closeText?: string;
  saveChangesText?: string;
  viewMode?: boolean;
  data?: InvoiceInterface | BillInterface;
}> = ({
  isOpen,
  onClose,
  onSave,
  title,
  closeText,
  saveChangesText,
  viewMode,
  data,
}): JSX.Element => {
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
                <p className="my-4 text-gray-600 text-lg leading-relaxed">
                  Modal content goes here...
                </p>
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
