import axios from "axios";
import React, { useEffect, useState } from "react";
import { isObjectEmpty, sessionRead } from "../utils";
import { BillInterface } from "../interfaces/bill.interface";
import { useDispatch, useSelector } from "react-redux";

export default function useBills(id: number) {
  const [bills, setBills] = useState<BillInterface[]>();
  const [loading, setLoading] = useState(false);
  const [billFulfilled, setBillFulfilled] = useState(false);
  const dispatch = useDispatch();
  const bill = useSelector((state: any) => state?.billReducer);

  useEffect(() => {
    if (!bill || !isObjectEmpty(bill)) {
      const accessToken = sessionRead("access_token");
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/bill/read/mine/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          dispatch({
            type: "BILL_FULFILL",
            payload: {
              bill: response.data?.result,
            },
          });
          setBills(response.data?.result);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
          setBillFulfilled(true);
        });
    } else {
      setBills(bill);
      setBillFulfilled(true);
    }
  }, [id]);

  return {
    bills,
    loading,
    billFulfilled,
  };
}
