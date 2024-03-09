import React, { useState } from "react";
import { loginValidator } from "../validators/login.validator";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { AlertTemplate } from "../templates/alert.template";
import SpinnerTemplate from "../templates/spinner.template";
import axios from "axios";
import { displayToast } from "../utils";
import FooterTemplate from "../templates/footer.template";

const RegisterPage: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (values: any): void => {
    const { email, password } = values;
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        email,
        password,
      })
      .then((response) => {
        displayToast(
          response.data?.status === 200 ? "Success!" : "Error!",
          response.data?.message,
          response.data?.status === 200
        );
        navigate("/login");
      })
      .catch((err) => {
        displayToast("Error!", err?.message, false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div id="register" className="fade-in">
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
            onSubmit={handleRegister}
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
                  Sign Up
                </button>
                <div className="text-center my-1 underline">
                  <Link to="/login">Do you have an accout? Sign In</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <FooterTemplate />
    </div>
  );
};

export default RegisterPage;
