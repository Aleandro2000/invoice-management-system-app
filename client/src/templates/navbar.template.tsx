import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sessionDeleteAll, sessionRead } from "../utils";
import SpinnerTemplate from "./spinner.template";

export default function NavbarTemplate(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    const refreshToken = sessionRead("refresh_token");
    const accessToken = sessionRead("access_token");
    setLoading(true);
    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/refresh_token/remove_refresh_token`,
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            Authorization: `Brearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        sessionDeleteAll();
      })
      .catch(() => {
        sessionDeleteAll();
      })
      .finally(() => {
        setLoading(false);
        navigate("/login");
      });
  };

  return (
    <nav
      className={`${isScrolled && "shadow-md"} bg-white py-4 fixed w-full z-10`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-end items-center">
          <Menu as="div" className="relative">
            <Menu.Button className="bg-black text-white hover:text-gray-500 duration-300 w-12 h-12 rounded-full">
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </Menu.Button>
            <Menu.Items className="absolute w-32 right-0 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none duration-300">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block p-2 text-sm font-bold`}
                      to="/invoices"
                    >
                      Invoices
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block p-2 text-sm font-bold`}
                      to="/bills"
                    >
                      Bills
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } block p-2 text-sm font-bold w-full text-left`}
                      onClick={handleLogout}
                      type="button"
                    >
                      {loading ? (
                        <SpinnerTemplate />
                      ) : (
                        <FontAwesomeIcon icon={faSignOut} />
                      )}{" "}
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
