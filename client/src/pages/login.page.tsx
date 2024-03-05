import React, { useState } from "react";
import { loginValidator } from "../validators/login.validator";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { AlertTemplate } from "../templates/alert.template";
import SpinnerTemplate from "../templates/spinner.template";

export default function LoginPage(): JSX.Element {
  const [loading ,setLoading] = useState(false);

  const handleLogin = (): void => {

  }

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
            {
              ({ errors, touched }) => (
                <Form className="mx-auto py-12 max-w-[400px]">
                  <Field type="email" className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-ass-black-3 focus:border-black duration-300" placeholder="Email" name="email" />
                  {
                    errors?.email && touched?.email && <AlertTemplate message={errors?.email} />
                  }
                  <Field type="password" className="w-full p-3 my-2 bg-transparent text-black rounded-lg border-2 border-ass-black-3 focus:border-black duration-300" placeholder="Password" name="password" />
                  {
                    errors?.password && touched?.password && <AlertTemplate message={errors?.password} />
                  }
                  <button disabled={loading} className="w-full my-5 p-3 bg-gradient-to-b from-ass-black-1 to-ass-black-2 text-white rounded-full" type="submit">
                    {!loading ? <FontAwesomeIcon className="mr-1" icon={faSignIn} size="1x" /> : <SpinnerTemplate />} Sign In
                  </button>
                  <div className="text-center my-1 underline">
                    <Link to="/signup">
                      Don&apos;t you have an accout? Sign Up
                    </Link>
                  </div>
                </Form>
              )
            }
          </Formik>
        </div>
      </div>
    </div>
  );
}
