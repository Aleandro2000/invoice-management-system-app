import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavbarTemplate(): JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {};

  return (
    <nav
      className={`${
        !isScrolled ? "bg-white" : "bg-gray shadow-md"
      } py-4 fixed w-full z-10`}
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
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
