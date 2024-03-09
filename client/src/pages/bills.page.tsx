import React from "react";
import NavbarTemplate from "../templates/navbar.template";
import { connect } from "react-redux";
import { UserInterface } from "../interfaces/user.inteface";
import LoadingPage from "./loading.page";
import useBills from "../hooks/use-bills";

const BillsPage: React.FC<{
  user: UserInterface;
}> = ({ user }): JSX.Element => {
  const { bills, billFulfilled, loading } = useBills(user?.id);

  return !loading ? (
    <div className="fade-in">
      <NavbarTemplate />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 mt-24">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
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
                    ? bills?.map((item, key): JSX.Element => {
                        return (
                          <tr key={key} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item?.id}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item?.amount}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {item?.due_date?.toString()}
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              @mdo
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
    </div>
  ) : (
    <LoadingPage />
  );
};

const mapStateToProps = (state: any) => ({
  user: state?.userReducer,
});

export default connect(mapStateToProps)(BillsPage);
