import React, { useState } from "react";
import { loginValidator } from "../validators/login.validator";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { AlertTemplate } from "../templates/alert.template";
import SpinnerTemplate from "../templates/spinner.template";
import { type Dispatch } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { displayToast, sessionWrite } from "../utils";
import { UserInterface } from "../interfaces/user.inteface";

const LoginPage: React.FC<{
  user: UserInterface;
  userFulfill: any;
  userEmpty: any;
}> = ({ user, userFulfill, userEmpty }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values: any): void => {
    const { email, password } = values;
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data?.status === 200 && response.data?.result) {
          userFulfill({
            ...user,
            ...{
              id: response.data?.result?.id,
            },
          });
          sessionWrite("id", response.data?.result?.id);
          sessionWrite("refresh_token", response.data?.result?.refreshToken);
          sessionWrite("access_token", response.data?.result?.accessToken);
          displayToast("Success!", response.data?.message);
          navigate("/invoices");
        } else {
          displayToast("Error!", response.data?.message, false);
        }
      })
      .catch((err) => {
        userEmpty();
        displayToast("Error!", err?.message, false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fade-in">
      <div className="container max-w-7xl mx-auto p-4">
        <div className="my-12">
          <div className="text-center font-bold text-2xl mx-5">
            Welcome back to Invoice Management!
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidator}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="mx-auto py-12 max-w-[400px]">
                <Field
                  type="email"
                  className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-black focus:border-black duration-300"
                  placeholder="Email"
                  name="email"
                />
                {errors?.email && touched?.email && (
                  <AlertTemplate message={errors?.email} />
                )}
                <Field
                  type="password"
                  className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-black focus:border-black duration-300"
                  placeholder="Password"
                  name="password"
                />
                {errors?.password && touched?.password && (
                  <AlertTemplate message={errors?.password} />
                )}
                <button
                  disabled={loading}
                  className="w-full my-5 p-3 bg-gradient-to-b from-ass-black-1 to-ass-black-2 text-black rounded-full"
                  type="submit"
                >
                  {!loading ? (
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={faSignIn}
                      size="1x"
                    />
                  ) : (
                    <SpinnerTemplate />
                  )}{" "}
                  Sign In
                </button>
                <div className="text-center my-1 underline">
                  <Link to="/register">
                    Don&apos;t you have an accout? Sign Up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state?.initialUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userFulfill: (payload: any) =>
    dispatch({
      type: "USER_FULFILL",
      payload,
    }),
  userEmpty: (payload: any) =>
    dispatch({
      type: "USER_FULFILL",
      payload,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
