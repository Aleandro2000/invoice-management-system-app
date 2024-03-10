import React, { useState } from "react";
import NavbarTemplate from "../templates/navbar.template";
import useInvoices from "../hooks/use-invoices";
import { connect } from "react-redux";
import { UserInterface } from "../interfaces/user.inteface";
import LoadingPage from "./loading.page";
import ButtonTemplate from "../templates/button.template";
import {
  faEdit,
  faEye,
  faFile,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ModalTemplate from "../templates/modal.template";
import FooterTemplate from "../templates/footer.template";
import { InvoiceInterface } from "../interfaces/invoice.interface";
import axios, { type AxiosResponse } from "axios";
import { displayToast, sessionRead } from "../utils";
import { type Dispatch } from "redux";

const InvoicesPage: React.FC<{
  user: UserInterface;
  invoice: InvoiceInterface[];
  invoiceFulfill: any;
  invoiceEmpty: any;
}> = ({ user, invoice, invoiceFulfill, invoiceEmpty }): JSX.Element => {
  const { invoices, invoiceFulfilled, loading } = useInvoices(user?.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<InvoiceInterface>();
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);

  const handleClose = () => setIsModalVisible(!isModalVisible);

  const handleNewInvoice = (values: InvoiceInterface) => {
    const accessToken = sessionRead("access_token");
    setEditLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/invoice/create`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.data?.status === 200) {
          invoiceFulfill([...invoice, values] as InvoiceInterface[]);
          displayToast("SUCCESS", response.data?.message);
        } else {
          displayToast("FAIL", response.data?.message, false);
        }
      })
      .catch(() => {})
      .finally(() => {
        setEditLoading(false);
      });
  };

  const handleEdit = (id: number, values: InvoiceInterface) => {
    const accessToken = sessionRead("access_token");
    setEditLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/invoice/update/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.data?.status === 200) {
          invoiceFulfill(
            invoice.map((item) =>
              item.id === id ? { ...item, ...values } : item
            )
          );
          displayToast("SUCCESS", response.data?.message);
        } else {
          displayToast("FAIL", response.data?.message, false);
        }
      })
      .catch(() => {})
      .finally(() => {
        setEditLoading(false);
      });
  };

  const handleDelete = (id: number) => {};

  const handleDeleteAll = () => {};

  return !loading ? (
    <div id="invoices" className="fade-in">
      <NavbarTemplate />
      <ModalTemplate
        data={viewData}
        title={`${viewMode ? "View" : editMode ? "Edit" : "New"} Invoice`}
        isOpen={isModalVisible}
        onClose={handleClose}
        onSave={editMode ? handleEdit : handleNewInvoice}
        viewMode={viewMode}
        type="invoice"
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 mt-24">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex space-x-3">
              <ButtonTemplate
                icon={faFile}
                text="New Invoice"
                onClick={() => {
                  setEditMode(false);
                  setViewMode(false);
                  setViewData(undefined);
                  handleClose();
                }}
              />
              <ButtonTemplate
                icon={faTrash}
                text="Delete All"
                onClick={handleClose}
                loading={deleteAllLoading}
              />
            </div>
            <div className="overflow-hidden mt-5">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Invoice ID
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    />
                  </tr>
                </thead>
                <tbody>
                  {invoiceFulfilled
                    ? invoices?.map((item, key): JSX.Element => {
                        return (
                          <tr key={key} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {key + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              INV{item?.id}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item?.amount}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item?.due_date?.toString()}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <ButtonTemplate
                                icon={faEye}
                                text="View"
                                onClick={() => {
                                  setViewMode(true);
                                  setViewData(invoice[key]);
                                  handleClose();
                                }}
                              />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <ButtonTemplate
                                icon={faEdit}
                                text="Edit"
                                loading={editLoading}
                                onClick={() => {
                                  setEditMode(true);
                                  setViewMode(false);
                                  setViewData(invoice[key]);
                                  handleClose();
                                }}
                              />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <ButtonTemplate
                                icon={faTrash}
                                text="Delete"
                                loading={deleteLoading}
                              />
                            </td>
                          </tr>
                        );
                      })
                    : "Loading..."}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterTemplate />
    </div>
  ) : (
    <div id="invoices">
      <LoadingPage />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state?.userReducer,
  invoice: state?.invoiceReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  invoiceFulfill: (payload: any) =>
    dispatch({
      type: "INVOICE_FULFILL",
      payload,
    }),
  invoiceEmpty: () =>
    dispatch({
      type: "INVOICE_EMPTY",
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPage);
