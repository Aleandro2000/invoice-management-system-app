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

const InvoicesPage: React.FC<{
  user: UserInterface;
}> = ({ user }): JSX.Element => {
  const { invoices, invoiceFulfilled, loading } = useInvoices(user?.id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClose = () => setIsModalVisible(!isModalVisible);

  return !loading ? (
    <div id="invoices" className="fade-in">
      <NavbarTemplate />
      <ModalTemplate
        title="Invoice"
        isOpen={isModalVisible}
        onClose={handleClose}
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 mt-24">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex space-x-3">
              <ButtonTemplate
                icon={faFile}
                text="New Invoice"
                onClick={handleClose}
              />
              <ButtonTemplate
                icon={faTrash}
                text="Delete All"
                onClick={handleClose}
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
                              <ButtonTemplate icon={faEye} text="View" />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <ButtonTemplate icon={faEdit} text="Edit" />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <ButtonTemplate icon={faTrash} text="Delete" />
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
});

export default connect(mapStateToProps)(InvoicesPage);
