import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sessionDeleteAll, sessionRead, sessionWrite } from "../utils";
import LoadingPage from "../pages/loading.page";

const withPrivateRoute = (Component: any) => {
  const [session, setSession] = useState(false);
  const user = useSelector((state: any) => state?.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = sessionRead("refresh_token");
    const accessToken = sessionRead("access_token");
    const id = sessionRead("id");
    if (!refreshToken || !accessToken) {
      sessionDeleteAll();
      navigate("/login");
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/refresh_token/refresh`, {
          id,
          refresh_token: refreshToken,
        })
        .then((response) => {
          dispatch({
            type: "USER_FULFILL",
            payload: {
              initialUser: {
                ...user,
                ...{
                  id,
                },
              },
            },
          });
          if (response.data?.status !== 200 || !response.data?.result) {
            sessionDeleteAll();
            navigate("/login");
          } else {
            sessionWrite("access_token", response.data?.result?.accessToken);
          }
        })
        .catch(() => {
          sessionDeleteAll();
          navigate("/login");
        })
        .finally(() => {
          setSession(true);
        });
    }
  }, [session]);

  return session ? <Component /> : <LoadingPage />;
};

export default withPrivateRoute;
