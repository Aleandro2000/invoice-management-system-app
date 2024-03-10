import React, { useState } from "react";
import NavbarTemplate from "../templates/navbar.template";
import usebills from "../hooks/use-bills";
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
import { BillInterface } from "../interfaces/bill.interface";
import axios, { type AxiosResponse } from "axios";
import { displayToast, sessionRead } from "../utils";
import { type Dispatch } from "redux";

const BillsPage: React.FC<{
  user: UserInterface;
  bill?: BillInterface[];
  billFulfill: any;
  billEmpty: any;
}> = ({ user, bill, billFulfill, billEmpty }): JSX.Element => {
  const { billFulfilled, loading } = usebills(user?.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [viewData, setViewData] = useState<BillInterface>();
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const [id, setId] = useState<number | undefined>();

  const handleClose = () => setIsModalVisible(!isModalVisible);

  const handleNewBill = (values: BillInterface) => {
    const accessToken = sessionRead("access_token");
    setEditLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/bill/create`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.data?.status === 200) {
          billFulfill({
            bill: [...(bill ?? []), response.data?.result] as BillInterface[],
          });
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

  const handleEdit = (id: number, values: BillInterface) => {
    const accessToken = sessionRead("access_token");
    setEditLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/bill/update/${id}`, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.data?.status === 200) {
          billFulfill({
            bill: bill?.map((item) =>
              item.id === id ? { ...item, ...values } : item
            ),
          });
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

  const handleDelete = (id: number) => {
    const accessToken = sessionRead("access_token");
    setDeleteLoading(true);
    axios
      .delete(`${import.meta.env.VITE_API_URL}/bill/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: AxiosResponse) => {
        if (response.data?.status === 200) {
          billFulfill({
            bill: bill?.filter((item) => item.id !== id),
          });
          displayToast("SUCCESS", response.data?.message);
        } else {
          displayToast("FAIL", response.data?.message, false);
        }
      })
      .catch(() => {})
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const handleDeleteAll = () => {
    const accessToken = sessionRead("access_token");
    setDeleteAllLoading(true);
    axios
      .delete(
        `${import.meta.env.VITE_API_URL}/bill/delete_by_user/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        if (response.data?.status === 200) {
          billEmpty();
          displayToast("SUCCESS", response.data?.message);
        } else {
          displayToast("FAIL", response.data?.message, false);
        }
      })
      .catch(() => {})
      .finally(() => {
        setDeleteAllLoading(false);
      });
  };

  return !loading ? (
    <div id="bills" className="fade-in">
      <NavbarTemplate />
      <ModalTemplate
        id={id}
        data={viewData}
        title={`${viewMode ? "View" : editMode ? "Edit" : "New"} Bill`}
        isOpen={isModalVisible}
        onClose={handleClose}
        onSave={editMode ? handleEdit : handleNewBill}
        viewMode={viewMode}
        type="bill"
      />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 mt-24">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="flex space-x-3">
              <ButtonTemplate
                icon={faFile}
                text="New Bill"
                onClick={() => {
                  setEditMode(false);
                  setViewMode(false);
                  setViewData(undefined);
                  setId(undefined);
                  handleClose();
                }}
              />
              <ButtonTemplate
                icon={faTrash}
                text="Delete All"
                onClick={handleDeleteAll}
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
                      Bill ID
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
                  {billFulfilled
                    ? bill?.map((item, key): JSX.Element => {
                        return (
                          <tr key={key} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {key + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              BIL{item?.id}
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
                                  setViewData(bill[key]);
                                  setId(undefined);
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
                                  setViewData(bill[key]);
                                  setId(item?.id);
                                  handleClose();
                                }}
                              />
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              <ButtonTemplate
                                icon={faTrash}
                                text="Delete"
                                loading={deleteLoading}
                                onClick={() => handleDelete(item?.id)}
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
    <div id="bills">
      <LoadingPage />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state?.userReducer,
  bill: state?.billReducer?.bill,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  billFulfill: (payload: any) =>
    dispatch({
      type: "BILL_FULFILL",
      payload,
    }),
  billEmpty: () =>
    dispatch({
      type: "BILL_EMPTY",
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillsPage);
