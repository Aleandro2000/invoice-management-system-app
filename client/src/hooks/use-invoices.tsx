import axios from "axios";
import React, { useEffect, useState } from "react";
import { isObjectEmpty, sessionRead } from "../utils";
import { InvoiceInterface } from "../interfaces/invoice.interface";
import { useDispatch, useSelector } from "react-redux";

export default function useInvoices(id: number) {
  const [invoices, setInvoices] = useState<InvoiceInterface[]>();
  const [loading, setLoading] = useState(false);
  const [invoiceFulfilled, setInvoiceFulfilled] = useState(false);
  const dispatch = useDispatch();
  const invoice = useSelector((state: any) => state?.invoiceReducer);

  useEffect(() => {
    if (!invoice || !isObjectEmpty(invoice)) {
      const accessToken = sessionRead("access_token");
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/invoice/read/mine/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          dispatch({
            type: "INVOICE_FULFILL",
            payload: { invoice: response.data?.result },
          });
          setInvoices(response.data?.result);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
          setInvoiceFulfilled(true);
        });
    } else {
      setInvoices(invoice);
      setInvoiceFulfilled(true);
    }
  }, [id]);

  return {
    invoices,
    loading,
    invoiceFulfilled,
  };
}
